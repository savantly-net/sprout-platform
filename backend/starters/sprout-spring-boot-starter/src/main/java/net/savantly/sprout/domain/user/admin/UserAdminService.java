package net.savantly.sprout.domain.user.admin;

import java.util.List;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;

public interface UserAdminService {
    
    List<SproutUser> getAllUsers();

    SproutUser createUser(UserCreateDto dto);

    SproutUser updateUser(String userId, UserUpdateDto dto);

    SproutUser getUserByUserId(String userId);

    SproutUser updateUserPassword(SproutUser user, String password);
}
