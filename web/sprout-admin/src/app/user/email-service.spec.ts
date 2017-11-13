import { TestBed, inject } from '@angular/core/testing';

import { EmailServiceService } from './email-service.service';

describe('EmailServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailServiceService]
    });
  });

  it('should be created', inject([EmailServiceService], (service: EmailServiceService) => {
    expect(service).toBeTruthy();
  }));
});
