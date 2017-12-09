import { AppService } from './app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sprout Admin';
  hideToolbar = this.appService.getHideToolbar();

  constructor (private appService: AppService) { }
}
