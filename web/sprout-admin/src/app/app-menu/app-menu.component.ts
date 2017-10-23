import { AppMenu, AppMenuService } from './app-menu.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  _menus: BehaviorSubject<AppMenu[]> = new BehaviorSubject<AppMenu[]>([]);
  menus: Observable<AppMenu[]> = this._menus.asObservable();

  constructor(appMenuService: AppMenuService) {
    appMenuService.findAll().subscribe((response) => {
      this._menus.next(response._embedded.menus);
    });
  }

  ngOnInit() {
  }

}
