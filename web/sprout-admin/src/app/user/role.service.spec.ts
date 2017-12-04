import { TestBed, inject } from '@angular/core/testing';

import { RoleService } from './role.service';
import { StandardModule } from '../standard/standard.module';

describe('RoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StandardModule],
      providers: [RoleService]
    });
  });

  it('should be created', inject([RoleService], (service: RoleService) => {
    expect(service).toBeTruthy();
  }));
});
