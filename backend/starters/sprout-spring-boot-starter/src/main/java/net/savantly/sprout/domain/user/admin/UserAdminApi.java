package net.savantly.sprout.domain.user.admin;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;


@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
@RestController
public class UserAdminApi {
    
    private final UserAdminService userAdminService;

	@GetMapping
	public ResponseEntity<List<SproutUser>> getUsers() {
		return ResponseEntity.ok(userAdminService.getAllUsers());
	}

    @PostMapping
    public ResponseEntity<SproutUser> createUser(@RequestBody UserCreateDto dto) {
        final SproutUser user = userAdminService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping
    public ResponseEntity<SproutUser> updateUser(@RequestBody UserUpdateDto dto) {
        final SproutUser user = userAdminService.updateUser(dto);
        return ResponseEntity.ok(user);
    }

}
