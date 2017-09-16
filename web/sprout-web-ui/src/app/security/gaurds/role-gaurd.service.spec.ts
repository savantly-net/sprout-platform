import { AuthenticationService } from '../authentication/authentication.service';
import { TestBed, inject } from '@angular/core/testing';

import { RoleGaurdService } from './role-gaurd.service';
import { APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];
const routing = RouterModule.forRoot(routes);

describe('RoleGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [routing],
      providers: [RoleGaurdService, AuthenticationService, {provide: APP_BASE_HREF, useValue: '/'}]
    });
  });

  it('should be created', inject([RoleGaurdService], (service: RoleGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
