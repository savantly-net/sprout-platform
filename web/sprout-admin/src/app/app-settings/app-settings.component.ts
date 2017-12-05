import { AppSettingsService, AppSetting, SettingName } from './app-settings.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InlineInputEditComponent } from '@savantly/ngx-inline-edit';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {

  KEYWORDS: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  SITE_DESCRIPTION: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  SITE_URL: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  PREVIEW_IMAGE: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  SITE_TITLE: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  SITE_BANNER: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  SHOW_BANNER: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  SITE_NAME: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());
  THEME: BehaviorSubject<AppSetting> = new BehaviorSubject(new AppSetting());

  THEME_OPTIONS: {key: string, value: string}[] = [
    {key: 'Light Blue/Yellow', value: 'light-blue-yellow-theme'},
    {key: 'Light Blue/Green', value: 'light-blue-green-theme'},
    {key: 'Light Blue/Pink', value: 'light-blue-pink-theme'},
    {key: 'Light Blue/Cyan', value: 'light-blue-cyan-theme'},
    {key: 'Light Blue/Amber', value: 'light-blue-amber-theme'},
    {key: 'Light Blue/Teal', value: 'light-blue-teal-theme'},
    {key: 'Indigo/Pink', value: 'indigo-pink-theme'},
    {key: 'Indigo/Deep Purple', value: 'indigo-deep-purple-theme'},
    {key: 'Indigo/Blue', value: 'indigo-blue-theme'},
    {key: 'Indigo/Cyan', value: 'indigo-cyan-theme'}
  ];

  itemChange(item: AppSetting) {
    this.service.saveItem(item).subscribe((response) => {
      this.snackBar.open('Saved setting: ' + item.id, 'Close', {duration: 1000});
    });
  }

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

  getOrDefault(options: {name: string, target: BehaviorSubject<any>, default?: any}) {
    this.service.findOne(options.name).subscribe((response) => {
      options.target.next(response);
    }, (error) => {
      options.target.next({
        id: options.name,
        value: options.default || ''
      });
    });
  }

  constructor(private service: AppSettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getOrDefault({name: SettingName.KEYWORDS, target: this.KEYWORDS});
    this.getOrDefault({name: SettingName.PREVIEW_IMAGE, target: this.PREVIEW_IMAGE});
    this.getOrDefault({name: SettingName.SHOW_BANNER, target: this.SHOW_BANNER});
    this.getOrDefault({name: SettingName.SITE_BANNER, target: this.SITE_BANNER});
    this.getOrDefault({name: SettingName.SITE_DESCRIPTION, target: this.SITE_DESCRIPTION});
    this.getOrDefault({name: SettingName.SITE_NAME, target: this.SITE_NAME});
    this.getOrDefault({name: SettingName.SITE_TITLE, target: this.SITE_TITLE});
    this.getOrDefault({name: SettingName.SITE_URL, target: this.SITE_URL});
    this.getOrDefault({name: SettingName.THEME, target: this.THEME, default: 'default-theme'});
  }


}
