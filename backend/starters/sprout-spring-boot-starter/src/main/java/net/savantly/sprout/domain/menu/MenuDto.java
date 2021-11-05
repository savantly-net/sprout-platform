package net.savantly.sprout.domain.menu;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.menu.MenuItemRenderMode;

@Getter @Setter
@Accessors(chain = true)
public class MenuDto {
	private String id;
	private String name;
	private String icon = "apps";
	private String displayText;
	private String parentName;
	private String url;
	private int weight;
	private List<String> authorities = new ArrayList<>();
	private List<MenuDto> children = new ArrayList<>();
	private MenuItemRenderMode renderMode = MenuItemRenderMode.INTERNAL;
}
