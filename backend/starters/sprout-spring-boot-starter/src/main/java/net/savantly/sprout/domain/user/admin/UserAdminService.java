package net.savantly.sprout.domain.user.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.users.SproutUserService;

@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class UserAdminService {
    
    private final SproutUserService userService;
    private final UserRepository userRepo;

    public List<SproutUser> getAllUsers() {
        return userRepo.findAll().stream().map(u -> (SproutUser)u).collect(Collectors.toList());
    }

    public SproutUser createUser(UserCreateDto dto) {
        return userService.createUser(dto.getUsername(), dto.getPassword(), dto.getEmailAddress(), dto.getFirstName(), dto.getLastName(), dto.getRoles());
    }

    public SproutUser updateUser(UserUpdateDto dto) {
        return userService.updateUser(dto);
    }

    public SproutUser getUserByUsername(String username) {
        return userService.loadUserByUsername(username);
    }

    public SproutUser updateUserPassword(String username, String password) {
        SproutUser user = userService.loadUserByUsername(username);
        userService.updatePassword(user, password);
        return user;
    }
}
