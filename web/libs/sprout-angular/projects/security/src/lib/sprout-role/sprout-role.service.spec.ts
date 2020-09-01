import { TestBed } from '@angular/core/testing';

import { SproutRoleService } from './sprout-role.service';

describe('SproutRoleServiceService', () => {
  let service: SproutRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SproutRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
