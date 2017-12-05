package net.savantly.sprout.settings;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="appSettings")
//@PreAuthorize("hasPermission(APP_SETTINGS_ADMIN")
public interface AppSettingRepository extends AppSettingRepositoryCustom, CrudRepository<AppSetting, String> {

}
