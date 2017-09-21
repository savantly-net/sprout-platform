import { MaterialModule } from '../material/material.module';
import { SecurityModule } from '@savantly/ngx-security';
import { MenuComponent } from './menu.component';
import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MenuComponent }
];
const routing = RouterModule.forRoot(routes);


describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecurityModule, routing, MaterialModule],
      providers: [MenuService, {provide: APP_BASE_HREF, useValue: '/'}],
      declarations: [MenuComponent]
    });
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));

  it('should be have a default menu created', inject([MenuService], (service: MenuService) => {
    service.getMenus().subscribe(menus => {
      expect(menus.length).toBe(1);
    });
  }));

});
