package net.savantly.sprout.domain.mail;


import org.springframework.jms.annotation.JmsListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.jms.JmsConfiguration;

@RequiredArgsConstructor
public class MailService {

    final private JavaMailSender emailSender;
    final private SproutConfigurationProperties props;
    
	
	@JmsListener(destination = "mailbox", containerFactory = JmsConfiguration.QUEUE_LISTENER_FACTORY)
	public void process(MailItem item) {
		this.sendSimpleMessage(item.getTo(), item.getSubject(), item.getBody());
	}
	

    public void sendSimpleMessage(
      String to, String subject, String text) {
    	
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom(props.getMail().getFrom());
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);
        
    }
}
