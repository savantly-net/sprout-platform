package net.savantly.sprout.starter;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import net.savantly.sprout.audit.AuditEventConverter;

@Configuration
@Import({AuditEventConverter.class})
public class SproutAuditConfiguration {

}
