import { EmbeddedResource } from '@lagoshny/ngx-hal-client';


export class ContentField extends EmbeddedResource {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
  metaData: any = {};
}
