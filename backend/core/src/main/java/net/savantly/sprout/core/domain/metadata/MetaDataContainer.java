package net.savantly.sprout.core.domain.metadata;

import java.util.Map;

public interface MetaDataContainer<T> {

	Map<String, T> getMetaData();
}
