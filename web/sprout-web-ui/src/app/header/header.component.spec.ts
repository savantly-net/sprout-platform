import { MaterialModule } from '../material/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { MenuModule, MenuService } from '@savantly/ngx-menu';


const menuServiceFactory = (_securityService: SecurityService) => {
  return new MenuService(_securityService);
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule, MaterialModule, SecurityModule.forRoot(), MenuModule],
      providers: [
        {
          provide: MenuService,
          useFactory: menuServiceFactory,
          deps: [SecurityService]
        },
        provideRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
