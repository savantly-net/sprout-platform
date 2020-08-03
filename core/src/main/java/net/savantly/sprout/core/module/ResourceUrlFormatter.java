package net.savantly.sprout.core.module;

import java.util.List;

import org.springframework.core.io.Resource;

public interface ResourceUrlFormatter {
	List<String> format(Resource[] resources);
}
