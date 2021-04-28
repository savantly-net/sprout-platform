package net.savantly.sprout.module.forms;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.util.FileCopyUtils;

import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutWebModule;

@Configuration
@EnableJpaRepositories
@EntityScan
@Import(FormsModuleConfiguration.class)
public class FormsModule implements SproutWebModule {

	public static final String version = "0.0.1";
	protected static final String PLUGIN_ID = "savantly-forms-module";
	private final SFDBMigration migrator;
	
	public FormsModule(SFDBMigration migrator) {
		this.migrator = migrator;
	}
	@Override
	public String getId() {
		return PLUGIN_ID;
	}

	@Override
	public String getVersion() {
		return version;
	}

	@Override
	public String getName() {
		return "Sprout Forms Module";
	}

	@Override
	public String getDescription() {
		return "Provides Formio APIs and UI components";
	}
	
	@Override
	public SproutModuleExecutionResponse install() {
		this.migrator.migrate();
		return new SproutModuleExecutionResponse() {
			
			@Override
			public boolean getSucceeded() {
				return true;
			}
			
			@Override
			public String getMessage() {
				return "installed forms schema";
			}
			
			@Override
			public int getCode() {
				return 0;
			}
		};
	}

	
	public static String asString(Resource resource) throws IOException {
		Reader reader = new InputStreamReader(resource.getInputStream());
		return FileCopyUtils.copyToString(reader);
    }
}