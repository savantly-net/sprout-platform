package net.savantly.sprout.core.domain.user.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.savantly.sprout.core.domain.user.SproutUserEntity;

@Service
public class UserPersistenceListener  extends AbstractRepositoryEventListener<SproutUserEntity> {
    
    private final Logger log = LoggerFactory.getLogger(UserPersistenceListener.class);
    private PasswordEncoder encoder;
    
    public UserPersistenceListener(PasswordEncoder encoder){
        this.encoder = encoder;
    }
    
    @Override
    protected void onBeforeSave(SproutUserEntity entity) {
        ensurePasswordIsEncrypted(entity);
    }
    
    @Override
    protected void onBeforeCreate(SproutUserEntity entity) {
        entity.setEnabled(true);
        ensurePasswordIsEncrypted(entity);
    }
    
    private void ensurePasswordIsEncrypted(SproutUserEntity entity) {
        if(entity.hasNewPassword()){
            log.debug("encoding unencrypted password: {}", entity.getClearTextPassword());
            entity.setPassword(encoder.encode(entity.getClearTextPassword()));
            entity.setClearTextPassword(null);
        }
    }

}
