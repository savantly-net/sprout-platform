package net.savantly.sprout.domain.folder;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
public class FolderDto {

	private String id;
	private String name;
	private String icon;
	private String parent;
	private List<FolderDto> children = new ArrayList<>();
	
	public FolderDto addChild(FolderDto dto) {
		this.children.add(dto);
		return this;
	}
}
