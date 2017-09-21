import { SecurityService } from '@savantly/ngxSecurity';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MenuService, Menu } from './menu.service';
import { MdMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() items: any[];
  menuService: MenuService;
  security: SecurityService;
  menus: Observable<Menu[]>;

  @ViewChildren(MdMenuTrigger) triggers: QueryList<MdMenuTrigger>;

  openMenu(trigger: MdMenuTrigger, level: number) {
    this.triggers
      .filter((x: any) => x._element.nativeElement.dataset.level >= level && x !== trigger)
      .forEach(x => x.closeMenu());
    trigger.openMenu();
  }

  closeMenu() {
    this.triggers.forEach(x => x.closeMenu());
  }

  doMenuItemCallback(subitem, $event) {
    if (subitem.callback) {
      subitem.callback($event);
    } else {
      console.warn('no callback defined');
    }
  };

  constructor(
    securityService: SecurityService,
    menuService: MenuService) {
    this.menuService = menuService;
    this.security = securityService;
  }

  ngOnInit() {
  }

}
