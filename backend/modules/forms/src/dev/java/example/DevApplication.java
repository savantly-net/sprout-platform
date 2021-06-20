package example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevApplication {

    public static void main(String[] args) {
    	System.setProperty("spring.profiles.active", "test");
    	
        SpringApplication.run(DevApplication.class, args);
    }
}
