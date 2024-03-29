package net.savantly.sprout.domain.user.search;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.domain.user.repository.UserRepository;

@RequiredArgsConstructor
@RequestMapping("/api/users")
@RestController
public class UserSearchApi {
	
	private final UserRepository userRepo;

	@GetMapping
	public ResponseEntity<List<UserSearchResponseItem>> getUsers() {
		final List<UserSearchResponseItem> users = convert(userRepo.findAll());
		return ResponseEntity.ok(users);
	}

	private List<UserSearchResponseItem> convert(List<SproutUserEntity> items) {
		return items.stream().map(item -> new UserSearchResponseItem()
				.setDisplayName(item.getDisplayName())
				.setItemId(item.getItemId())
				.setUserName(item.getUsername()))
			.collect(Collectors.toList());
	}
	
}
