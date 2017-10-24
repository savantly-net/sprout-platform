package net.savantly.sprout.core.domain.menu;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(name="inlineMenuItems", types = { Menu.class })
public interface InlineMenuItems {
	String getId();
	String getDisplayText();
	boolean is_public();
	Set<String> getRoles();
	Set<Menu> getItems();
	int getPosition();
	boolean isDisabled();
	String getIcon();

}
