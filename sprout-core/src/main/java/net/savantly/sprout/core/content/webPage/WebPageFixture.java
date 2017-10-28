package net.savantly.sprout.core.content.webPage;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

public class WebPageFixture extends AbstractBaseFixture<WebPage, WebPageRepository> {

	public static final String DEFAULT_WEB_PAGE_NAME = "Default WebPage";
	private WebPageRepository repository;
	private WebPageLayoutFixture webPageLayoutFixture;
	private WebPageLayoutRepository webPageLayoutRepository;
	

	public WebPageFixture(WebPageRepository repository, WebPageLayoutRepository webPageLayoutRepository, WebPageLayoutFixture webPageLayoutFixture) {
		super(repository);
		this.repository = repository;
		this.webPageLayoutRepository = webPageLayoutRepository;
		this.webPageLayoutFixture = webPageLayoutFixture;
	}

	@Override
	public void addEntities(List<WebPage> entityList) {
		WebPage page = repository.findOneByName(DEFAULT_WEB_PAGE_NAME);
		if (page == null) {
			WebPageLayout layout = webPageLayoutRepository.findOneByName(webPageLayoutFixture.defaultWebPageLayoutName);
			page = new WebPage();
			page.setName(DEFAULT_WEB_PAGE_NAME);
			page.setWebPageLayout(layout);
			entityList.add(page);
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		dependencies.add(webPageLayoutFixture);
	}

}
