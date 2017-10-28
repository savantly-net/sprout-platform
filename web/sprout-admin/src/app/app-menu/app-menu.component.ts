import { Identifiable } from '../spring-data/rest-repository.service';
import { PageBrowserDialogComponent } from '../web-page/page/page-browser-dialog/page-browser-dialog.component';
import { AppMenu, AppMenuService } from './app-menu.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
      this._menus.next(response._embedded.menus);
    }, (error) => {
      console.log(error);
    });
  }

  saveItem(item) {
    this.appMenuService.saveItem(item).subscribe((response) => {
      console.log(response);
    });
  }

  reloadItem(item) {
    this.appMenuService.findOne(item.id).subscribe((response) => {
      Object.assign(item, response);
    });
  }

  addItem() {
    this.createMenuItem().then((menuItem) => {
      this.appMenuService.saveItem(menuItem).subscribe((response) => {
        console.log(response);
        this.loadMenus();
      });
    });
  }

  getGreatestPosition(): Promise<number> {
    const promise = new Promise((resolve, reject) => {
      let maxPosition = 0;
      this._menus.value.map((item) => {
        maxPosition = Math.max(item.position, maxPosition);
      });
      resolve(maxPosition);
    });
    return promise;
  }

  createMenuItem(): Promise<AppMenu> {
    const promise = new Promise((resolve, reject) => {
      const menuItem = new AppMenu();
      menuItem.icon = 'bookmark';
      menuItem.displayText = 'New Menu Item';
      menuItem.url = '/';
      this.getGreatestPosition().then((position) => {
        menuItem.position = position + 1;
        resolve(menuItem);
      });
    });
    return promise;

  }

  addToItemList(parentItem: AppMenu) {
    this.createMenuItem().then((menuItem) => {
      this.appMenuService.addToItemList(parentItem, menuItem).subscribe((response) => {
        console.log(response);
        this.loadMenus();
      });
    });
  }

  deleteItem(parent: AppMenu, item: AppMenu): void {
    if (parent != null) {
      this.appMenuService.removeChild(parent, item).subscribe(() => {
        this.loadMenus();
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


  browseContent(item: AppMenu) {
    const dialogRef = this.dialog.open(PageBrowserDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      item.url = result.value;
    });
  }

  constructor(private appMenuService: AppMenuService, private dialog: MatDialog) {
    // this.menus = this._menus.asObservable();
    this.loadMenus();
  }

  ngOnInit() {
  }

}
