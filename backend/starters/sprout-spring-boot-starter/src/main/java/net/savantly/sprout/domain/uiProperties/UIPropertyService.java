package net.savantly.sprout.domain.uiProperties;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UIPropertyService {
	
	private final UIPropertyRepository repo;
	
	public Optional<UIProperty> getUIPropertyByName(WellKnownUIProp prop) {
		List<UIProperty> result = repo.findByName(prop.name());
		if (result.isEmpty()) {
			return Optional.empty();
		} else {
			return Optional.of(result.get(0));
		}
	}
	
	public Optional<UIProperty> getUIPropertyByName(String name) {
		List<UIProperty> result = repo.findByName(name);
		if (result.isEmpty()) {
			return Optional.empty();
		} else {
			return Optional.of(result.get(0));
		}
	}
	

	public UIProperty saveUIProperty(String name, String value) {
		List<UIProperty> result = repo.findByName(name);
		if (result.isEmpty()) {
			return repo.save(new UIProperty().setName(name).setValue(value));
		} else {
			UIProperty prop = result.get(0);
			prop.setValue(value);
			return repo.save(prop);
		}
	}
	
	public UIProperty saveUIProperty(WellKnownUIProp prop, String value) {
		List<UIProperty> result = repo.findByName(prop.name());
		if (result.isEmpty()) {
			return repo.save(new UIProperty().setName(prop.name()).setValue(value));
		} else {
			UIProperty uiprop = result.get(0);
			uiprop.setValue(value);
			return repo.save(uiprop);
		}
	}

}
