package net.savantly.sprout.domain.mail;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

@Configuration
public class MailConfiguration {

	@Bean
	@ConditionalOnBean(JavaMailSender.class)
	public MailService mailService(JavaMailSender emailSender, SproutConfigurationProperties props) {
		return new MailService(emailSender, props);
	}
}
