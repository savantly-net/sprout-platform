package net.savantly.sprout.core.domain.menu;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Entity
@Table(name="MENU")
@Getter @Setter
@Accessors(chain = true)
public class Menu extends TenantedPersistedDomainObject {
	
	private String displayText;
	
	private boolean _public;
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "MENU_ROLES")
	@OrderColumn(name = "index_id")
	private Set<String> roles = new HashSet<>();
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="parent", orphanRemoval=true)
	private Set<Menu> items = new HashSet<>();
	
	private int position;
	
	private boolean disabled;
	
	private String icon;
	
	@ManyToOne(fetch=FetchType.LAZY, optional=true)
	@JoinColumn(name="PARENT_ID", nullable=true)
	@JsonBackReference
	private Menu parent;
	
	private String url;
	
	

}
