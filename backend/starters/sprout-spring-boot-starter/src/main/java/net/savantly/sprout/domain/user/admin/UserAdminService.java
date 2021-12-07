package net.savantly.sprout.domain.user.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.users.SproutUserService;

@RequiredArgsConstructor
public class UserAdminService {
    
    private final SproutUserService userService;
    private final UserRepository userRepo;

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<SproutUser> getAllUsers() {
        return userRepo.findAll().stream().map(u -> (SproutUser)u).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public SproutUser createUser(UserCreateDto dto) {
        return userService.createUser(dto.getUsername(), dto.getPassword(), dto.getEmailAddress(), dto.getFirstName(), dto.getLastName(), dto.getRoles());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public SproutUser updateUser(UserUpdateDto dto) {
        return userService.updateUser(dto);
    }
}
