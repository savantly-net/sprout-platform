import { TestBed, inject } from '@angular/core/testing';

import { SecurityMockService } from './security-mock.service';

describe('MockSecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityMockService]
    });
  });

  it('should be created', inject([SecurityMockService], (service: SecurityMockService) => {
    expect(service).toBeTruthy();
  }));
});
