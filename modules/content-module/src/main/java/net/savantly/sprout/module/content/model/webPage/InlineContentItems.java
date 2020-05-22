package net.savantly.sprout.module.content.model.webPage;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.module.content.model.webPageContent.FullWebPageContent;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayout;

@Projection(name="inlineContentItems", types= {WebPage.class})
public interface InlineContentItems {
	String getId();
	String getName();
	String getDescription();
	Set<FullWebPageContent> getContentItems();
	WebPageLayout getWebPageLayout();
	boolean isHome();
	boolean isNew();
}
