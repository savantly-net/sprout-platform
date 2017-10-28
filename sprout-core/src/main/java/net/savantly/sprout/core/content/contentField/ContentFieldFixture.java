package net.savantly.sprout.core.content.contentField;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class ContentFieldFixture extends AbstractBaseFixture<ContentField, ContentFieldRepository>{

	public ContentFieldFixture(ContentFieldRepository repository) {
		super(repository);
	}

	@Override
	public void addEntities(List<ContentField> entityList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}

}
