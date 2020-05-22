import { HalResponse, RestRepositoryService } from '../../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Layout extends HalResponse {
  name: string;
  description?: string;
  placeHolders: string[];
  template: string;
  showHeader: boolean;
  showFooter: boolean;
}

@Injectable()
export class LayoutService extends RestRepositoryService<Layout> {

  constructor(http: HttpClient) {
    super(http, '/api/repo/webPageLayouts');
  }

}
