import { ClientApiService } from './client-api.service';
import { Component, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'my-client-api',
  templateUrl: './client-api.component.html',
  styleUrls: ['./client-api.component.css']
})
export class ClientApiComponent implements AfterViewInit {

  constructor(private sproutApi: ClientApiService, private snackBar: MatSnackBar) { }

  handleToast(options) {
    if (options) {
      if (typeof options === 'string') {
        this.snackBar.open(options, 'close');
      } else {
        this.snackBar.open(options);
      }
    }
  }

  ngAfterViewInit() {
    this.sproutApi.toastSubject.subscribe(options => this.handleToast(options));
  }

}
