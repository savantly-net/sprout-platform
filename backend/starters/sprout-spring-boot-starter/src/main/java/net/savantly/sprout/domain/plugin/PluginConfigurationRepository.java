package net.savantly.sprout.domain.plugin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PluginConfigurationRepository extends JpaRepository<PluginConfigurationEntity, String> {

//	List<PluginConfigurationEntity> findByIdItemId(String id);

}
