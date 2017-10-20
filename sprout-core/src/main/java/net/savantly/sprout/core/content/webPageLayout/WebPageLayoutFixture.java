package net.savantly.sprout.core.content.webPageLayout;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class WebPageLayoutFixture extends AbstractBaseFixture<WebPageLayout, WebPageLayoutRepository> {

	private WebPageLayoutRepository repository;
	public static final String defaultWebPageLayoutName = "Default WebPageLayout";

	public WebPageLayoutFixture(WebPageLayoutRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addEntities(List<WebPageLayout> entityList) {
		WebPageLayout webPageLayout = repository.findOneByName(defaultWebPageLayoutName);
		if (webPageLayout == null) {
			webPageLayout = new WebPageLayout();
			webPageLayout.setName(defaultWebPageLayoutName);
			webPageLayout.setDescription("Simple 3 column layout");
			webPageLayout.getPlaceHolders().add("leftSide");
			webPageLayout.getPlaceHolders().add("center");
			webPageLayout.getPlaceHolders().add("rightSide");
			webPageLayout.setTemplate("<div fxLayout fxFlexFill><div>#{leftSide}</div><div fxFlex>#{center}</div><div>#{rightSide}</div></div>");
			entityList.add(webPageLayout);
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}

}
