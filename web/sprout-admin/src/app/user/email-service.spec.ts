import { TestBed, inject } from '@angular/core/testing';

import { EmailService } from './email-service';
import { StandardModule } from '../standard/standard.module';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StandardModule],
      providers: [EmailService]
    });
  });

  it('should be created', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});
