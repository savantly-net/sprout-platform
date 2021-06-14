package net.savantly.sprout.domain.mail;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MailItem {

	private String to;
	private String subject;
	private String body;
}
