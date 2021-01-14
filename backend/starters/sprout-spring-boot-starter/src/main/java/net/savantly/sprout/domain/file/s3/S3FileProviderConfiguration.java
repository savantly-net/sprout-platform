package net.savantly.sprout.domain.file.s3;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

/**
 * 
 * This code expects that you have AWS credentials set up per:
 * http://docs.aws.amazon.com/java-sdk/latest/developer-guide/setup-credentials.html
 */
@ConditionalOnProperty(prefix = "sprout.files", name="provider-name", havingValue="s3FileProvider")
@Configuration
@Getter @Setter
@RequiredArgsConstructor
public class S3FileProviderConfiguration {
	 
	private final SproutConfigurationProperties props;
 
    @Bean
    public S3Client getAmazonS3Cient() {
        return S3Client.builder().region(Region.of(props.getFiles().getS3().getRegion())).build();
    }
    
    @Bean
    public S3FileProvider s3FileProvider(S3Client s3) {
    	return new S3FileProvider(props, s3);
    }
    
    @Bean
    public S3FileProviderApi s3FileProviderApi() {
    	return new S3FileProviderApi(props);
    }

}
