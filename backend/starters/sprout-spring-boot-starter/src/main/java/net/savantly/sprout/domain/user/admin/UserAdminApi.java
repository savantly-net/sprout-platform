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

    @Operation(summary = "Get a single User by ID")
    @GetMapping(path = "/{userid}")
	public ResponseEntity<SproutUser> getUserByUsername(@PathVariable("userid") String userid) {
		return ResponseEntity.ok(userAdminService.getUserByUserId(userid));
	}

    @Operation(summary = "Creates a new User given the payload")
    @PostMapping
    public ResponseEntity<SproutUser> createUser(@RequestBody UserCreateDto dto) {
        final SproutUser user = userAdminService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @Operation(summary = "Updates an existing user with the given payload")
    @PutMapping(path = "/{userid}")
    public ResponseEntity<SproutUser> updateUser(@PathVariable("userid") String userid, @RequestBody UserUpdateDto dto) {
        final SproutUser user = userAdminService.updateUser(userid, dto);
        return ResponseEntity.ok(user);
    }
    
    @Operation(summary = "Updates an existing user's password'")
    @PutMapping(path = "/{userid}/password")
    public ResponseEntity<SproutUser> updateUserPassword(@PathVariable("userid") String userid, @RequestBody UserPasswordUpdateDto input) {
        SproutUser user = userAdminService.getUserByUserId(userid);
        return ResponseEntity.ok(userAdminService.updateUserPassword(user, input.getPassword()));
    }

}
