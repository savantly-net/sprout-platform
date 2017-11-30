package net.savantly.sprout.settings;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
//@PreAuthorize("hasPermission(APP_SETTINGS_ADMIN")
public interface AppSettingRepository extends CrudRepository<AppSetting, SettingName> {

}
