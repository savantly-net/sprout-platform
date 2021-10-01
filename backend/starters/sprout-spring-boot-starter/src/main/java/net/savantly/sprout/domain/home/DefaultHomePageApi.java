package net.savantly.sprout.domain.home;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;

public class DefaultHomePageApi implements HomePageApi {
	
	public HomePageData getHomePageData() {
		InputStream inputStream;
		try {
			inputStream = new ClassPathResource("META-INF/index.html").getInputStream();
			String text = new BufferedReader(
				      new InputStreamReader(inputStream, StandardCharsets.UTF_8))
				        .lines()
				        .collect(Collectors.joining("\n"));
			
			return new SimpleHomePage().setDataType(HomePageDataType.MARKUP)
					.setData(text);
		} catch (IOException e) {
			return new SimpleHomePage().setData(e.getLocalizedMessage());
		}
	}

}
