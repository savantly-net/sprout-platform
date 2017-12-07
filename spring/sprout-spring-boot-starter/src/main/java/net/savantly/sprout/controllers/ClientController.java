package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import net.savantly.sprout.core.content.fieldType.FieldType;
import net.savantly.sprout.settings.AppSetting;
import net.savantly.sprout.settings.AppSettingRepository;

@RestController
@RequestMapping("/rest/client")
public class ClientController {

	AppSettingRepository settings;
	ObjectMapper mapper;
	
	public ClientController(AppSettingRepository settings) {
		this.settings = settings;
		this.mapper = new ObjectMapper();
		this.mapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);

	}

	@RequestMapping({"/config"})
	@ResponseBody
	public Iterable<AppSetting> config() throws IOException {
		return this.settings.findAll();
	}
	
	@RequestMapping({"/fieldTypes"})
	public String fieldTypes() throws JsonProcessingException {
		List<JsonNode> fieldTypes = new ArrayList<>();
		Arrays.stream(FieldType.values()).forEach((ft) -> {
			fieldTypes.add(ft.toJsonNode());
		});
		return mapper.writeValueAsString(fieldTypes);
	}

}
