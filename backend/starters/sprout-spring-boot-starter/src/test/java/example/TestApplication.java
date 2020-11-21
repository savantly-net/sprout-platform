package example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TestApplication {

    public static void main(String[] args) {
    	System.setProperty("spring.profiles.active", "test");
    	
        SpringApplication.run(TestApplication.class, args);
    }
}
