package net.savantly.sprout.content.contentItem;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import net.savantly.sprout.core.content.contentItem.ContentItem;

public class ContentItemRenderingChain implements InitializingBean {
	
	@Autowired
	private ApplicationContext context;
	
	private List<ContentItemRenderer> contentItemRenderers = new ArrayList<>();
	
	public void addRenderer(ContentItemRenderer renderer) {
		this.contentItemRenderers.add(renderer);
	}
	
	private List<ContentItemRenderer> getRenderersInPriority() {
		return Collections.unmodifiableList(this.contentItemRenderers.stream()
				.sorted(Comparator.comparing(ContentItemRenderer::getPriority).reversed())
				.collect(Collectors.toList()));
	}
	
	public void renderContentItem(ContentItem content, StringWriter writer) {
		for (ContentItemRenderer contentItemRenderer : getRenderersInPriority()) {
			if(contentItemRenderer.render(content, writer)) {
				return;
			}
		}
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		Map<String, ContentItemRenderer> beans = context.getBeansOfType(ContentItemRenderer.class);
		this.contentItemRenderers.addAll(beans.values());
	}

}
