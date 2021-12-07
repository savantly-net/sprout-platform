package net.savantly.sprout.domain.user.admin;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserCreateDto {
    
    @NotNull
    private String username;
    private String displayName;
    private String firstName;
    private String lastName;
    @NotNull
    private String emailAddress;
    private String password;

    private List<String> roles = new ArrayList<>();
}
