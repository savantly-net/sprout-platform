import { RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppMenu extends HalResponse {
    id: string;
    text: string;
    isPublic: boolean;
    roles: string[];
    items: AppMenu[];
    position: number;
    disabled: boolean;
    icon: string;
}

@Injectable()
export class AppMenuService  extends RestRepositoryService<AppMenu> {

  constructor(http: HttpClient) {
    super(http, '/api/menus');
  }

}
