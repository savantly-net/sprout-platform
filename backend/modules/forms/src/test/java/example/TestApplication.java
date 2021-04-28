package example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;

@SpringBootApplication
@EnableAspectJAutoProxy
@EnableJpaRepositories
@EntityScan
@Import(SproutAutoConfiguration.class)
public class TestApplication {
	
    public static void main(String[] args) {
    	System.setProperty("spring.profiles.active", "test");
    	
        SpringApplication.run(TestApplication.class, args);
    }

}
