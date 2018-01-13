import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientApiComponent } from './client-api.component';
import { ClientApiService } from './client-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClientApiComponent],
  exports: [ClientApiComponent],
  providers: [ClientApiService]
})
export class ClientApiModule {}
