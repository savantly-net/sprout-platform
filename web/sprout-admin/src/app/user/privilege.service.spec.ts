import { TestBed, inject } from '@angular/core/testing';

import { PrivilegeService } from './privilege.service';
import { StandardModule } from '../standard/standard.module';

describe('PrivilegeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StandardModule],
      providers: [PrivilegeService]
    });
  });

  it('should be created', inject([PrivilegeService], (service: PrivilegeService) => {
    expect(service).toBeTruthy();
  }));
});
