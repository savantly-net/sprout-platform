import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItemsComponent } from './content-items.component';
import { ContentItemsService } from './content-items.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContentItemsComponent],
  providers: [ContentItemsService]
})
export class ContentItemsModule { }
