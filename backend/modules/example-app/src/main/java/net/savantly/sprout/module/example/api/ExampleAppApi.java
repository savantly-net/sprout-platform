package net.savantly.sprout.module.example.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/example-app")
@RequiredArgsConstructor
public class ExampleAppApi {

	private final String message;
	
	@GetMapping
	public String getMessage() {
		return message;
	}
	
}
