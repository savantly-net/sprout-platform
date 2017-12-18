import { TestBed, inject } from '@angular/core/testing';

import { PrivilegeService } from './privilege.service';

describe('PrivilegeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivilegeService]
    });
  });

  it('should be created', inject([PrivilegeService], (service: PrivilegeService) => {
    expect(service).toBeTruthy();
  }));
});
