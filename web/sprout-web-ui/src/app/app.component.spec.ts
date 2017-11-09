import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppMenuService } from './app-menu/app-menu.service';
import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityModule, SecurityMockService, ISecurityService } from '@savantly/ngx-security';
import { ApiService } from './shared';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        SecurityModule,
        MenuModule
      ],
      declarations: [AppComponent, AppMenuComponent],
      providers: [
        {provide: ISecurityService, useClass: SecurityMockService},
        {provide: MenuService, useClass: MenuService, deps: [ISecurityService]},
        ApiService, AppMenuService, provideRoutes([])]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(true);
  });

});
