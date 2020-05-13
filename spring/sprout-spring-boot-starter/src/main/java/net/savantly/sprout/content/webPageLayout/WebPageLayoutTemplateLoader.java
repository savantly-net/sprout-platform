package net.savantly.sprout.content.webPageLayout;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.time.ZoneOffset;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import freemarker.cache.TemplateLoader;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

public class WebPageLayoutTemplateLoader implements TemplateLoader {

	private static final Logger log = LoggerFactory.getLogger(WebPageLayoutTemplateLoader.class);

	private WebPageLayoutRepository repository;

	public WebPageLayoutTemplateLoader(WebPageLayoutRepository repository) {
		this.repository = repository;
	}

	/**
	 * Retrieves the associated template for a given id.
	 *
	 * When Freemarker calls this function it appends a locale trying to find a
	 * specific version of a file. For example, if we need to retrieve the
	 * layout with id = 1, then freemarker will first try to load layoutId =
	 * 1_en_US, followed by 1_en and finally layoutId = 1. That's the reason why
	 * we have to catch NumberFormatException even if it is comes from a numeric
	 * field in the database.
	 *
	 * @return a template instance or null if not found.
	 * @throws IOException
	 *             if a severe error happens, like not being able to access the
	 *             database.
	 */
	@Override
	public Object findTemplateSource(String id) throws IOException {

		Optional<WebPageLayout> item = repository.findById(id);
		if (item.isPresent()) {
			return item;
		} else {
			log.warn("Item: {} \tDoes not exist", id);
			return null;
		}
	}

	/**
	 * Returns the last modification date of a given template. If the item does
	 * not exist any more in the database, this method will return Long's
	 * MAX_VALUE to avoid freemarker's from recompiling the one in its cache.
	 *
	 * @param templateSource
	 * @return
	 */
	@Override
	public long getLastModified(Object templateSource) {
		WebPageLayout template = (WebPageLayout) templateSource;
		Optional<WebPageLayout> item = repository.findById(template.getId());
		if (item.isPresent()) {
			if(item.get().getLastModifiedDate().isPresent()) {
				return item.get().getLastModifiedDate().get().toEpochSecond(ZoneOffset.UTC);
			} else {
				return Long.MIN_VALUE;
			}
		} else {
			log.warn("item: {} \tDoes not exist", template);
			return Long.MAX_VALUE;
		}
	}
	
	@Override
	public Reader getReader(Object templateSource, String encoding) throws IOException {
		return new StringReader(((WebPageLayout) templateSource).getTemplate());
	}

	@Override
	public void closeTemplateSource(Object templateSource) throws IOException {
		// Nothing to do here...
	}
}