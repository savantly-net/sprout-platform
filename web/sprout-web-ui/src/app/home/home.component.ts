import { SettingsService } from '../settings/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  siteBanner: string;
  showBanner: boolean;

  constructor(settingsService: SettingsService) {
    settingsService.value.subscribe((settings) => {
      if (!settings) { return; }
      this.siteBanner = settings.SITE_BANNER;
      this.showBanner = settings.SHOW_BANNER === 'false' ? false : true;
    });
  }

  ngOnInit() {
    console.log('Hello Home');
  }
}
