import { TestBed, inject } from '@angular/core/testing';

import { ServiceLocator } from './service-locator';
import { ComponentTestModule } from '../testing/component-test.module';

describe('ServiceLocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [ServiceLocator]
    });
  });

  it('should be created', inject([ServiceLocator], (service: ServiceLocator) => {
    expect(service).toBeTruthy();
  }));
});
