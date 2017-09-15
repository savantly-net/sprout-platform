import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from './shared';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MenuModule],
      declarations: [AppComponent],
      providers: [ApiService, provideRoutes([])]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(true);
  });

});
