import { MaterialModule } from '../material/material.module';
import { SecurityModule } from '@savantly/ngx-security';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';
import { MenuService } from './menu.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: MenuComponent }
];
const routing = RouterModule.forRoot(routes);

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuModule, MaterialModule, routing, SecurityModule],
      providers: [MenuService, {provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
