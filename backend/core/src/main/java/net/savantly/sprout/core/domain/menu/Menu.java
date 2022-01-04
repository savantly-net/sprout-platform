package net.savantly.sprout.core.domain.menu;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OrderColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
//@Table(name="MENU", uniqueConstraints = {@UniqueConstraint(columnNames = {"tenant_id", "name"})})
@Table(name="MENU", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
@Getter @Setter
@Accessors(chain = true)
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Menu extends PersistedDomainObject {

	private String displayText;
	private String name;
	
	private boolean _public;

	@Column(name="authority",columnDefinition = "json")
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "MENU_AUTHORITIES")
	@OrderColumn(name = "index_id")
	@Type(type = "json")
	private Set<String> authorities = new HashSet<>();

	private int weight;
	private boolean disabled;
	private String icon;
	private String parentName;
	private String url;
	private MenuItemRenderMode renderMode = MenuItemRenderMode.INTERNAL;

}
