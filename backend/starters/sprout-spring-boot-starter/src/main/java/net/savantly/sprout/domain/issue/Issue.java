package net.savantly.sprout.domain.issue;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(name = "ISSUES")
@Getter
@Setter
@Accessors(chain = true)
public class Issue extends PersistedDomainObject {

	private IssueState status = IssueState.OPEN;
	private String title;

	@Column(length = 5000)
	private String description;

	@ElementCollection
	private Set<String> tags = new HashSet<>();

}
