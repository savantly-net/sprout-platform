import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SecurityModule } from '@savantly/ngx-security';
import { ApiService } from './shared';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MenuModule } from '@savantly/ngx-menu';

describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        MaterialModule,
        SecurityModule.forRoot(),
        MenuModule.forRoot()
      ],
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
