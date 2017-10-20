import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageService } from './page.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [PageComponent],
  providers: [PageService]
})
export class PageModule { }
