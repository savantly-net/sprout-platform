package net.savantly.sprout.domain.dashboard.link;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class DashboardLink {

	private String title;
	private String target;
	private String href;

}
