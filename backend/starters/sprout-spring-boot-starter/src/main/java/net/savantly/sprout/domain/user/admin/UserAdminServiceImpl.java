package net.savantly.sprout.domain.user.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.exception.UserIdNotFoundException;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.starter.problem.EntityNotFoundProblem;

@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class UserAdminServiceImpl implements UserAdminService {
    
    private final SproutUserService userService;
    private final UserRepository userRepo;

    public List<SproutUser> getAllUsers() {
        return userRepo.findAll().stream().map(u -> (SproutUser)u).collect(Collectors.toList());
    }

    public SproutUser createUser(UserCreateDto dto) {
        return userService.createUser(dto.getUsername(), dto.getPassword(), dto.getEmailAddress(), dto.getFirstName(), dto.getLastName(), dto.getRoles());
    }

    public SproutUser updateUser(String userId, UserUpdateDto dto) {
        try {
            SproutUser user = userService.loadUserByUserId(userId);
            dto.setUsername(user.getUsername());
            return userService.updateUser(dto);
        } catch (UserIdNotFoundException e) {
            throw new EntityNotFoundProblem(SproutUser.class.getName(), userId);
        }
    }

    public SproutUser getUserByUserId(String userId) {
        try {
            return userService.loadUserByUserId(userId);
        } catch (UserIdNotFoundException e) {
            throw new EntityNotFoundProblem(SproutUser.class.getName(), userId);
        }
    }

    public SproutUser updateUserPassword(SproutUser user, String password) {
        userService.updatePassword(user, password);
        return user;
    }
}
