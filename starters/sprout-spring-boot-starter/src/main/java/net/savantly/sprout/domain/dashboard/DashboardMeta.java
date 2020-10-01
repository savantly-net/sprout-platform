package net.savantly.sprout.domain.dashboard;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode
public class DashboardMeta {

	  private Boolean canSave = true;
	  private Boolean canEdit = true;
	  private Boolean canDelete = true;
	  private Boolean canShare = true;
	  private Boolean canStar = true;
	  private Boolean canAdmin = true;
	  private String url;
	  private Long folderId = 0L;
	  private Boolean canMakeEditable = true;
	  private Boolean submenuEnabled = false;
	  private Boolean provisioned = true;
	  private int focusPanelId;
	  private Boolean isStarred = true;
	  private Boolean showSettings = true;
	  private String folderTitle = "root";
	  private String folderUrl;
	  private String created = "2020-10-01T00:00:00";
	  private String createdBy = "system";
	  private String update = "2020-10-01T00:00:00";
	  private String updatedBy = "system";
	  
}
