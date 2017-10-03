import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { WikiModule } from './wiki.module';
import { WikiComponent } from './wiki.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SproutPluginModule } from '@savantly/ngx-sprout-plugin';

export const menuServiceFactory2 = (_securityService: SecurityService) => {
  return new MenuService(_securityService);
};


describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SecurityModule.forRoot(),
        MenuModule,
        SproutPluginModule.forRoot(),
        WikiModule
      ],
      providers: [
      {
        provide: MenuService,
        useFactory: menuServiceFactory2,
        deps: [SecurityService]
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
