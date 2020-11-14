package net.savantly.sprout.domain.menu;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class MenuDto {
	private String name;
	private String icon = "apps";
	private String displayText;
	private String parentName;
	private String url;
	private List<MenuDto> children = new ArrayList<>();
}
