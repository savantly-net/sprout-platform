import { NgModule } from '@angular/core';
import { ContentFieldModule } from './content-field/content-field.module';
import { ContentItemModule } from './content-item/content-item.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { ContentTypesModule } from './content-types/content-types.module';
import { FieldTypeModule } from './field-type/field-type.module';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [ 
    ContentFieldModule,
    ContentItemModule,
    ContentTemplateModule,
    ContentTypesModule,
    FieldTypeModule
  ]
})
export class SproutContentModule { }
