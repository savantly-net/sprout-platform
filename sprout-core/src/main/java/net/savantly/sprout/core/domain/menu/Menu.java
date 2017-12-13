package net.savantly.sprout.core.domain.menu;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;

import com.fasterxml.jackson.annotation.JsonBackReference;

import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class Menu extends PersistedDomainObject {
	
	private String displayText;
	private boolean _public;
	private Set<String> roles;
	private Set<Menu> items;
	private int position;
	private boolean disabled;
	private String icon;
	private Menu parent;
	private String url;
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

	public String getDisplayText() {
		return displayText;
	}
	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}
	public boolean is_public() {
		return _public;
	}
	public void set_public(boolean _public) {
		this._public = _public;
	}
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "MENU_ROLES")
	@OrderColumn(name = "index_id")
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="parent", orphanRemoval=true)
	public Set<Menu> getItems() {
		return items;
	}
	public void setItems(Set<Menu> items) {
		this.items = items;
	}
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}
	public boolean isDisabled() {
		return disabled;
	}
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	@ManyToOne(fetch=FetchType.LAZY, optional=true)
	@JoinColumn(name="PARENT_ID", nullable=true)
	@JsonBackReference
	public Menu getParent() {
		return parent;
	}
	public void setParent(Menu parent) {
		this.parent = parent;
	}

}
