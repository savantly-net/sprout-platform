package net.savantly.sprout.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.controllers.exception.UnknownSproutModule;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.core.module.web.NavigationItem;
import net.savantly.sprout.core.module.web.UIRoute;
import net.savantly.sprout.model.AdminUserInterfaceModel;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/plugins")
public class PluginsApi {
	
	private final static Logger log = LoggerFactory.getLogger(PluginsApi.class);

	private final SproutModuleRegistrationRepository registrationRepository;
	private final ObjectMapper mapper;
	private final List<SproutModule> sproutModules;
	
	@GetMapping("")
	public HashMap<String, Object> getSproutModules(){
		HashMap<String, Object> response = new HashMap<>();
		
		AdminUserInterfaceModel clientConfig = new AdminUserInterfaceModel()
				.setNavigationItems(getNavigationItems())
				.setRoutes(getUIRoutes())
				.setScripts(getScriptResources());
		response.put("clientConfig", clientConfig);

		HashSet<JsonNode> pluginDetails = new HashSet<>();
		this.sproutModules.stream().forEach((m) -> {
			ObjectWriter moduleWriter = mapper.writerFor(SproutModule.class);
			try {
				String stringValue = moduleWriter.writeValueAsString(m);
				JsonNode json = mapper.readTree(stringValue);
				Optional<SproutModuleRegistration> registration = registrationRepository.findById(m.getKey());
				if (registration.isPresent()) {
					((ObjectNode)json).putPOJO("installed", registration.get().isInstalled());
				}
				pluginDetails.add(json);
			} catch (Exception e) {
				log.error("Failed to serialize bean: {}", e);
			}
		});
		response.put("plugins", pluginDetails);
		return response;
	}

	@GetMapping("/{name}")
	public String getSproutModuleUserConfig(@PathVariable String name){
		SproutModule bean = getModuleByName(name);
		if (SproutWebModule.class.isAssignableFrom(bean.getClass())) {
			return ((SproutWebModule)bean).getAdminPanelMarkup();
		} else {
			return String.format("<h1>%s</h1>", name);
		}
	}
	
	@PostMapping("/{name}/install")
	public SproutModuleExecutionResponse installModule(@PathVariable String name) {
		SproutModule bean = getModuleByName(name);
		SproutModuleExecutionResponse result = bean.install();
		markRegistrationInstallStatus(name, result.getSucceeded());
		return result;
	}

	@PostMapping("/{name}/uninstall")
	public SproutModuleExecutionResponse uninstallModule(@PathVariable String name) {
		SproutModule bean = getModuleByName(name);
		SproutModuleExecutionResponse result = bean.uninstall();
		markRegistrationInstallStatus(name, false);
		return result;
	}
	
	private List<NavigationItem> getNavigationItems(){
		return sproutModules.stream()
				.filter(m -> SproutWebModule.class.isAssignableFrom(m.getClass()))
				.flatMap(m -> ((SproutWebModule)m).getNavigationItems().stream()).collect(Collectors.toList());
	}

	private List<UIRoute> getUIRoutes(){
		return sproutModules.stream()
				.filter(m -> SproutWebModule.class.isAssignableFrom(m.getClass()))
				.flatMap(m -> ((SproutWebModule)m).getUIRoutes().stream()).collect(Collectors.toList());
	}
	
	private List<String> getScriptResources(){
		return sproutModules.stream()
				.filter(m -> SproutWebModule.class.isAssignableFrom(m.getClass()))
				.flatMap(m -> ((SproutWebModule)m).getScriptResources().stream()).collect(Collectors.toList());
	}
	
	private SproutModule getModuleByName(String name) {
		return sproutModules.stream().filter(m->m.getKey().contentEquals(name)).findFirst().orElseThrow(()->new UnknownSproutModule("SproutModule not found: " + name));
	}

	private void markRegistrationInstallStatus(String key, boolean b) {
		SproutModuleRegistration registration = registrationRepository.findById(key).orElseThrow(RuntimeException::new);
		registration.setInstalled(b);
		registrationRepository.save(registration);
	}
}