import { TestBed, inject } from '@angular/core/testing';

import { TenantService } from './tenant.service';
import { ComponentTestModule } from '../testing/component-test.module';

describe('TenantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [TenantService]
    });
  });

  it('should be created', inject([TenantService], (service: TenantService) => {
    expect(service).toBeTruthy();
  }));
});
