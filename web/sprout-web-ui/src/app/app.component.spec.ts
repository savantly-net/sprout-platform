import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { ApiService } from './shared';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

const menuServiceFactory = (_securityService: SecurityService) => {
  return new MenuService(_securityService);
};

describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        MaterialModule,
        SecurityModule.forRoot(),
        MenuModule
      ],
      declarations: [HeaderComponent, AppComponent],
      providers: [ApiService, provideRoutes([]),
        {
          provide: MenuService,
          useFactory: menuServiceFactory,
          deps: [SecurityService]
        }]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(true);
  });

});
