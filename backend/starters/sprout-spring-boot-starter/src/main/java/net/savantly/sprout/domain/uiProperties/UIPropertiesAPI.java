package net.savantly.sprout.domain.uiProperties;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ui-properties")
public class UIPropertiesAPI {
	
	@Autowired
	UIPropertyRepository repo;
	
	@GetMapping
	public List<UIProperty> getSettings(){
		return this.repo.findAll();
	}

}
