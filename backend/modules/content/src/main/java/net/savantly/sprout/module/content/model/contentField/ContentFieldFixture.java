package net.savantly.sprout.module.content.model.contentField;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class ContentFieldFixture extends AbstractBaseFixture<ContentFieldImpl, ContentFieldRepository>{

	public ContentFieldFixture(ContentFieldRepository repository) {
		super(repository);
	}

	@Override
	public void addEntities(List<ContentFieldImpl> entityList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}

}
