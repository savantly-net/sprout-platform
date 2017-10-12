import { TestBed, inject } from '@angular/core/testing';

import { ServiceLocator } from './service-locator';

describe('ServiceLocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceLocator]
    });
  });

  it('should be created', inject([ServiceLocator], (service: ServiceLocator) => {
    expect(service).toBeTruthy();
  }));
});
