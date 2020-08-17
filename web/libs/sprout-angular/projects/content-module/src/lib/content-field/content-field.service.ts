import { Resource, RestService, EmbeddedResource } from '@lagoshny/ngx-hal-client';
import { Injectable, Injector } from '@angular/core';
import { ContentType } from '../content-types';


export class ContentField extends EmbeddedResource {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
  contentType: ContentType;
}
