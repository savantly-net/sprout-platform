package net.savantly.sprout.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.node.ObjectNode;

import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;

@RestController
@RequestMapping("/rest/plugins")
public class PluginsController {
	
	private final static Logger log = LoggerFactory.getLogger(PluginsController.class);

	private ApplicationContext context;
	
	@Autowired
	private SproutModuleRegistrationRepository registrationRepository;
	@Autowired
	private ObjectMapper mapper;
	
	public PluginsController(ApplicationContext context) {
		this.context = context;
	}
	
	@PostConstruct
	public void post() {

	}
	
	@RequestMapping({"", "/"})
	public HashMap<String, JsonNode> getSproutModules(){
		HashMap<String, JsonNode> plugins = new HashMap<String, JsonNode>();
		this.context.getBeansOfType(SproutModule.class).entrySet().stream().forEach((m) -> {
			ObjectWriter moduleWriter = mapper.writerFor(SproutModule.class);
			try {
				String stringValue = moduleWriter.writeValueAsString(m.getValue());
				JsonNode json = mapper.readTree(stringValue);
				Optional<SproutModuleRegistration> registration = registrationRepository.findById(m.getKey());
				if (registration.isPresent()) {
					((ObjectNode)json).putPOJO("installed", registration.get().isInstalled());
				}
				plugins.put(m.getKey(), json);
			} catch (Exception e) {
				log.error("Failed to serialize bean: {}", e);
			}
		});
		return plugins;
	}
	
	@RequestMapping("/install")
	public SproutModuleExecutionResponse installModule(@RequestBody Map<String, String> request) {
		String key = request.get("key");
		Assert.notNull(key, "A module key was not provided");
		SproutModule bean = this.context.getBean(key, SproutModule.class);
		SproutModuleExecutionResponse result = bean.install();
		markRegistrationInstallStatus(key, result.getSucceeded());
		return result;
	}
	
	private void markRegistrationInstallStatus(String key, boolean b) {
		Optional<SproutModuleRegistration> registration = registrationRepository.findById(key);
		registration.get().setInstalled(b);
		registrationRepository.save(registration.get());
	}

	@RequestMapping("/uninstall")
	public SproutModuleExecutionResponse uninstallModule(@RequestBody Map<String, String> request) {
		String key = request.get("key");
		Assert.notNull(key, "A module key was not provided");
		SproutModule bean = this.context.getBean(key, SproutModule.class);
		SproutModuleExecutionResponse result = bean.uninstall();
		markRegistrationInstallStatus(key, false);
		return result;
	}
	
	@RequestMapping("/{name}/user-config")
	public Map<String, String> getSproutModuleUserConfig(@PathVariable("name") String name){
		Assert.isTrue(this.context.containsBean(name), "plugin module not found: " + name);
		SproutModule bean = this.context.getBean(name, SproutModule.class);
		return bean.getUserConfiguration();
	}

	@RequestMapping("/{name}/admin-config")
	public Map<String, String> getSproutModuleAdminConfig(@PathVariable("name") String name){
		Assert.isTrue(this.context.containsBean(name), "plugin module not found: " + name);
		SproutModule bean = this.context.getBean(name, SproutModule.class);
		return bean.getAdminConfiguration();
	}
}
