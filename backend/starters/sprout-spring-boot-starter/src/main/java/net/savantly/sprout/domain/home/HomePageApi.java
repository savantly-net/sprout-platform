package net.savantly.sprout.domain.home;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/home")
@RestController
public interface HomePageApi {

	@GetMapping
	HomePageData getHomePageData();
}
