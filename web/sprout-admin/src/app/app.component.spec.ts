import { TestBed, async } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuModule } from './menu/menu.module';
import { MaterialModule } from './material/material.module';

import { ContentItemModule } from './content-item/content-item.module';
import { ContentTypesModule } from './content-types/content-types.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { ContentFieldModule } from './content-field/content-field.module';

import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        MenuModule,
        ContentTypesModule,
        ContentItemModule],
      providers: [provideRoutes([]), AppService]
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
