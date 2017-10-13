import { Identifiable, RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ContentItem extends HalResponse {
  id: string;
  name: string;
  description?: string;
}

@Injectable()
export class ContentItemService extends RestRepositoryService<ContentItem>  {

  constructor(http: HttpClient) {
    super(http, '/api/contentItems');
  }

}
