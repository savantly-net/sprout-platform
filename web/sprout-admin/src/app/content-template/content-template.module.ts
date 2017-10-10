import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTemplateComponent } from './content-template.component';
import { ContentTemplateService } from './content-template.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContentTemplateComponent],
  providers: [ContentTemplateService]
})
export class ContentTemplateModule { }
