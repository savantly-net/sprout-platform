package net.savantly.sprout.core.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SproutPasswordEncoder extends BCryptPasswordEncoder{

    @Override
    public String encode(CharSequence rawPassword) {
        // TODO Auto-generated method stub
        return super.encode(rawPassword);
    }
    
    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        // TODO Auto-generated method stub
        boolean matched = super.matches(rawPassword, encodedPassword);
        return matched;
    }
}
