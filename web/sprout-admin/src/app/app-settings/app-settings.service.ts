import { HalResponse, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AppSetting extends HalResponse {
  id: string;
  value: boolean;
  new = false;
}

export class SettingName {
  static KEYWORDS = 'KEYWORDS';
  static SITE_DESCRIPTION = 'SITE_DESCRIPTION';
  static SITE_URL = 'SITE_URL';
  static PREVIEW_IMAGE = 'PREVIEW_IMAGE';
  static SITE_TITLE = 'SITE_TITLE';
  static SITE_BANNER = 'SITE_BANNER';
  static SHOW_BANNER = 'SHOW_BANNER';
  static SITE_NAME = 'SITE_NAME';
  static THEME = 'THEME';
}

@Injectable()
export class AppSettingsService extends RestRepositoryService<AppSetting> {

  siteName() {
    return this.findOne(SettingName.SITE_NAME);
  }

  constructor(http: HttpClient) {
    super(http, '/api/appSettings');
  }

}
