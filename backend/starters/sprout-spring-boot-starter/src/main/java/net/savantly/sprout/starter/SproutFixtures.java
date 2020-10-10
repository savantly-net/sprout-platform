package net.savantly.sprout.starter;

import java.util.Collection;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.security.FakeContext;

public class SproutFixtures {

	private static final Logger log = LoggerFactory.getLogger(SproutFixtures.class);
	
	private AnnotationConfigApplicationContext ctx;

	public SproutFixtures(ApplicationContext parentContext) {
		this.ctx = new AnnotationConfigApplicationContext();
		this.ctx.setParent(parentContext);
		this.ctx.register(SproutFixturesConfiguration.class);
		this.ctx.refresh();
	}
	
	public void installFixtures(String schema) {
		FakeContext fakeContext = new FakeContext();
		fakeContext.create();
		for (Fixture<?> fixture : getFixtures()) {
			try {
				fixture.install();
			} catch (Exception ex) {
				log.error("could not install fixture", ex);
				throw ex;
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private Collection<Fixture> getFixtures() {
		Map<String, Fixture> fixtureBeans = ctx.getBeansOfType(Fixture.class);
		return fixtureBeans.values();
	}

	

}
