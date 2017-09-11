package net.savantly.sprout.core.domain.emailAddress;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.util.Assert;

import net.savantly.sprout.core.domain.user.SproutUser;

@Entity
public class EmailAddress implements Serializable{

    private static final long serialVersionUID = 1L;
    
    private String emailAddress;
    private boolean verified;
    private SproutUser user;

    public EmailAddress() {
    }

    public EmailAddress(String emailAddress) {
        this(emailAddress, false);
    }

    public EmailAddress(String emailAddress, boolean verified) {
        Assert.hasText(emailAddress, "email address is required");
        this.emailAddress = emailAddress.toLowerCase();
        this.verified = verified;
    }

    @Id
    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        Assert.hasText(emailAddress, "email address is required");
        this.emailAddress = emailAddress.toLowerCase();
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean confirmed) {
        this.verified = confirmed;
    }

    @ManyToOne
    public SproutUser getUser() {
        return user;
    }

    public void setUser(SproutUser user) {
        this.user = user;
    }

}
