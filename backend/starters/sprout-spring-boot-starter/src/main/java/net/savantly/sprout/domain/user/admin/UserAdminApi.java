package net.savantly.sprout.domain.user.admin;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;


@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
@RestController
public class UserAdminApi {
    
    private final UserAdminService userAdminService;

    @Operation(summary = "Get a list of all Users")
	@GetMapping
	public ResponseEntity<List<SproutUser>> getUsers() {
		return ResponseEntity.ok(userAdminService.getAllUsers());
	}

    @Operation(summary = "Get a single User by username")
    @GetMapping(path = "/{username}")
	public ResponseEntity<SproutUser> getUserByUsername(@PathVariable("username") String username) {
		return ResponseEntity.ok(userAdminService.getUserByUsername(username));
	}

    @Operation(summary = "Creates a new User give the payload")
    @PostMapping
    public ResponseEntity<SproutUser> createUser(@RequestBody UserCreateDto dto) {
        final SproutUser user = userAdminService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @Operation(summary = "Updates an existing user with the given payload")
    @PutMapping
    public ResponseEntity<SproutUser> updateUser(@RequestBody UserUpdateDto dto) {
        final SproutUser user = userAdminService.updateUser(dto);
        return ResponseEntity.ok(user);
    }
    
    @Operation(summary = "Updates an existing user's password'")
    @PutMapping(path = "/{username}/password")
    public ResponseEntity<SproutUser> updateUserPassword(@PathVariable("username") String username, @RequestBody String password) {
        final SproutUser user = userAdminService.updateUserPassword(username, password);
        return ResponseEntity.ok(user);
    }

}
