import { TestBed, async } from '@angular/core/testing';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { AppComponent } from './app.component';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { SproutPluginModule, SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin';
import { WikiModule } from './modules/wiki/wiki.module';

const menuServiceFactory = (_securityService: SecurityService) => {
  return new MenuService(_securityService);
};


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SecurityModule,
        SproutPluginModule,
        MenuModule,
        WikiModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
      SproutPluginRegistryService,
      SecurityService,
      {
        provide: MenuService,
        useFactory: menuServiceFactory,
        deps: [SecurityService]
      }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
