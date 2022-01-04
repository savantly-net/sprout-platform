package net.savantly.sprout.domain.feed;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.feed.item.FeedItem;
import net.savantly.sprout.domain.feed.post.FeedPostDto;
import net.savantly.sprout.domain.feed.post.FeedPostService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedApi {

	private final FeedService feedService;
	private final FeedPostService postService;

	@GetMapping
	public ResponseEntity<Flux<FeedItem>> getFeedItems(
			@RequestParam(name = "beforeDate", required = false) ZonedDateTime beforeDate,
			@RequestParam(name = "maxItems", defaultValue = "50") int maxItems) {
		if (Objects.isNull(beforeDate)) {
			beforeDate = ZonedDateTime.now();
		}
		return ResponseEntity.ok(feedService.findItemsBeforeDate(beforeDate, maxItems));
	}

	@PostMapping("/post")
	public ResponseEntity<Mono<FeedItem>> createPost(@RequestBody FeedPostDto dto) {
		return ResponseEntity.ok(postService.createPost(dto));
	}

	@DeleteMapping("/post/{itemId}")
	public ResponseEntity<Void> createPost(@PathVariable String itemId) {
		postService.deletePost(itemId);
		return ResponseEntity.ok().build();
	}
}
