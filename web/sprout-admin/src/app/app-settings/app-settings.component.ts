import { AppSettingsService, AppSetting } from './app-settings.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InlineInputEditComponent } from '@savantly/ngx-inline-edit';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {

  KEYWORDS: string;
  SITE_DESCRIPTION: string;
  SITE_URL: string;
  PREVIEW_IMAGE: string;
  SITE_TITLE: string;
  SITE_BANNER: string;
  SHOW_BANNER: string;
  SITE_NAME: Observable<AppSetting>;

  onChange(key: string) {
    return (event, ctrl: InlineInputEditComponent) => {
      const appSetting = new AppSetting();
      appSetting.id = key;
      appSetting.value = ctrl.value;

      console.log(appSetting);
      this.service.saveItem(appSetting).subscribe((response) => {
        this.snackBar.open('Saved setting: ' + key, 'Close', {duration: 1000});
      });
    };
  }

  constructor(private service: AppSettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.SITE_NAME = this.service.siteName();
  }

}
