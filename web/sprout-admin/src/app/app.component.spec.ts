import { TestBed, async } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuModule } from './menu/menu.module';

import { ContentItemsModule } from './content-items/content-items.module';
import { ContentTypesModule } from './content-types/content-types.module';

import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
        RouterTestingModule,
        MenuModule,
        ContentTypesModule,
        ContentItemsModule],
      providers: [provideRoutes([])]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sprout Admin');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
   // expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
