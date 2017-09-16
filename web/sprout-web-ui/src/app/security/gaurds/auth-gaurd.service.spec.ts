import { AuthenticationService } from '../authentication/authentication.service';
import { TestBed, inject } from '@angular/core/testing';

import { AuthGaurdService } from './auth-gaurd.service';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];
const routing = RouterModule.forRoot(routes);


describe('AuthGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [routing],
      providers: [AuthGaurdService, AuthenticationService, {provide: APP_BASE_HREF, useValue: '/'}]
    });
  });

  it('should be created', inject([AuthGaurdService], (service: AuthGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
