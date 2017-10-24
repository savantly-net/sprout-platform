import { Identifiable } from '../spring-data/rest-repository.service';
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
  _menus: BehaviorSubject<Array<AppMenu>> = new BehaviorSubject<AppMenu[]>([]);

  get menus() {
    return this._menus.asObservable();
  }

  loadMenus() {
    console.log('loading menus');
    this.appMenuService.getRootMenus().subscribe((response) => {
      console.log(response);
      response._embedded.menus.map((menu) => {
//        this.appMenuService.getChildren(menu).subscribe((childrenResponse) => {
//          menu.items = childrenResponse._embedded.menus;
//        });
      });
      this._menus.next(response._embedded.menus);
    });
  }

  addItem() {
    const menuItem = new AppMenu();
    menuItem.displayText = 'New Menu Item';
    this.appMenuService.saveItem(menuItem).subscribe((response) => {
      console.log(response);
      this.loadMenus();
    });
  }

  addToItemList(parentItem: AppMenu) {
    const menuItem = new AppMenu();
    menuItem.displayText = 'New Menu Item';
    this.appMenuService.addToItemList(parentItem, menuItem).subscribe((response) => {
      console.log(response);
      this.loadMenus();
    });
  }

  deleteItem(parent: AppMenu, item: AppMenu): void {
    if (parent != null) {
      this.appMenuService.removeChild(parent, item).subscribe(() => {
        this.appMenuService.deleteItem(item).subscribe(() => {
          this.loadMenus();
        });
      });
    } else {
      this.appMenuService.deleteItem(item).subscribe(() => {
        this.loadMenus();
      });
    }
  }

  trackById(index: number, item: Identifiable) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  constructor(private appMenuService: AppMenuService) {
    // this.menus = this._menus.asObservable();
    this.loadMenus();
  }

  ngOnInit() {
  }

}
