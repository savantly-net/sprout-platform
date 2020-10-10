package net.savantly.sprout.server.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class MyEntity {
	
	@Id
	private String id;

}
