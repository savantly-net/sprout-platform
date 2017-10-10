package net.savantly.sprout.content.contentType;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import freemarker.cache.TemplateLoader;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;

public class ContentTypeTemplateLoader implements TemplateLoader {

	private static final Logger log = LoggerFactory.getLogger(ContentTypeTemplateLoader.class);

	private ContentTemplateRepository repository;

	public ContentTypeTemplateLoader(ContentTemplateRepository repository) {
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
	 * @param layoutId
	 * @return a template instance or null if not found.
	 * @throws IOException
	 *             if a severe error happens, like not being able to access the
	 *             database.
	 */
	@Override
	public Object findTemplateSource(String id) throws IOException {

		ContentTemplate ct = repository.findOne(id);
		if (ct == null) {
			log.warn("ContentTemplate: {} \tDoes not exist", id);
			return null;
		} else {
			return ct;
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
		ContentTemplate template = (ContentTemplate) templateSource;
		ContentTemplate ct = repository.findOne(template.getId());
		if (ct == null) {
			log.warn("ContentTemplate: {} \tDoes not exist", template);
			return Long.MAX_VALUE;
		} else {
			if(ct.getLastModifiedDate() != null) {
				return ct.getLastModifiedDate().getMillis();
			} else {
				return Long.MAX_VALUE;
			}
		}
	}
	
	@Override
	public Reader getReader(Object templateSource, String encoding) throws IOException {
		return new StringReader(((ContentTemplate) templateSource).getContent());
	}

	@Override
	public void closeTemplateSource(Object templateSource) throws IOException {
		// Nothing to do here...
	}

}