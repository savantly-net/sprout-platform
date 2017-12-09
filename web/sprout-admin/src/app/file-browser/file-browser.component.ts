import { AppService } from '../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.css']
})
export class FileBrowserComponent implements OnInit {

  constructor(private appService: AppService) {
    this.appService.setHideToolbar(true);
  }

  ngOnInit() {
  }

}
