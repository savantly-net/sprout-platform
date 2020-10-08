package net.savantly.sprout.domain.dashboard.panel;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PanelService {

	@Autowired
	private ObjectMapper mapper;
	

	public Panel fromDto(PanelDto dto) throws JsonProcessingException {
		return new Panel()
			.setGridPos(dto.getGridPos())
			.setId(dto.getId())
			.setOptions(mapper.writeValueAsString(dto.getOptions()))
			.setPluginVersion(dto.getPluginVersion())
			.setTitle(dto.getTitle())
			.setTransparent(dto.isTransparent())
			.setType(dto.getType());
	}
	
	public PanelDto toDto(Panel entity) throws JsonProcessingException {
		TypeReference<Map<String, Object>> typeRef = new TypeReference<Map<String, Object>>(){};
		return new PanelDto()
			.setGridPos(entity.getGridPos())
			.setId(entity.getId())
			.setOptions(mapper.readValue(entity.getOptions(), typeRef))
			.setPluginVersion(entity.getPluginVersion())
			.setTitle(entity.getTitle())
			.setTransparent(entity.isTransparent())
			.setType(entity.getType());
	}
}
