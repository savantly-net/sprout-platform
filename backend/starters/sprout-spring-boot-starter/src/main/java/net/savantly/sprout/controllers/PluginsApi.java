package net.savantly.sprout.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.controllers.exception.UnknownSproutModule;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.domain.plugin.PluginConfigurationDto;
import net.savantly.sprout.model.AdminUserInterfaceModel;
import net.savantly.sprout.module.PluginService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/plugins")
public class PluginsApi {
	
	private final static Logger log = LoggerFactory.getLogger(PluginsApi.class);

	private final ObjectMapper mapper;
	private final List<SproutModule> sproutModules = new ArrayList<>();
	private final PluginService pluginService;
	
	@GetMapping("")
	public Flux<PluginMeta> getAllPlugins(){
		return Flux.fromIterable(this.pluginService.getAllPlugins());
	}
	
	@GetMapping("/app")
	public Flux<PluginMeta> getAppPlugins() {
		return Flux.fromIterable(this.pluginService.getAppPlugins());
	}

	@GetMapping("/panel")
	public Flux<PluginMeta> getPanelPlugins() {
		return Flux.fromIterable(this.pluginService.getPanelPlugins());
	}

	public HashMap<String, Object> getSproutModules(){
		HashMap<String, Object> response = new HashMap<>();
		
		AdminUserInterfaceModel clientConfig = new AdminUserInterfaceModel()
				.setScripts(getScriptResources());
		response.put("clientConfig", clientConfig);

		HashSet<JsonNode> pluginDetails = new HashSet<>();
		this.sproutModules.stream().forEach((m) -> {
			ObjectWriter moduleWriter = mapper.writerFor(SproutModule.class);
			try {
				String stringValue = moduleWriter.writeValueAsString(m);
				JsonNode json = mapper.readTree(stringValue);
				pluginDetails.add(json);
			} catch (Exception e) {
				log.error("Failed to serialize bean: {}", e);
			}
		});
		response.put("plugins", pluginDetails);
		return response;
	}

	@GetMapping("/{id}")
	public String getSproutModuleInformation(@PathVariable String id){
		SproutModule bean = getModuleById(id);
		if (SproutWebModule.class.isAssignableFrom(bean.getClass())) {
			return ((SproutWebModule)bean).getPluginInformationContent();
		} else {
			return String.format("<h1>%s</h1>", id);
		}
	}

	@GetMapping("/{id}/settings")
	public Mono<PluginMeta> getSproutModuleSettings(@PathVariable String id){
		return Mono.just(this.pluginService.getPluginMetaByPluginId(id));
	}

	@PostMapping("/{id}/settings")
	public Mono<PluginConfigurationDto> getSproutModuleSettings(@PathVariable String id, @RequestBody PluginConfigurationDto updates) throws JsonProcessingException{
		return Mono.just(this.pluginService.updatePluginConfiguration(id, updates));
	}

	@GetMapping("/{id}/markdown/{markdownType}")
	public String getSproutModuleMarkdown(@PathVariable String id, @PathVariable String markdownType){
		return this.pluginService.getPluginMarkdownByPluginId(id, markdownType);
	}

	private List<String> getScriptResources(){
		return sproutModules.stream()
				.filter(m -> SproutWebModule.class.isAssignableFrom(m.getClass()))
				.flatMap(m -> ((SproutWebModule)m).getScriptResources().stream()).collect(Collectors.toList());
	}

	private SproutModule getModuleById(String id) {
		return sproutModules.stream().filter(m->m.getId().contentEquals(id)).findFirst().orElseThrow(()->new UnknownSproutModule("SproutModule not found: " + id));
	}
}