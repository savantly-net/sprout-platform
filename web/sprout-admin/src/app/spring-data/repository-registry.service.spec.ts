import { TestBed, inject } from '@angular/core/testing';

import { RepositoryRegistryService } from './repository-registry.service';

describe('RepositoryRegistryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryRegistryService]
    });
  });

  it('should be created', inject([RepositoryRegistryService], (service: RepositoryRegistryService) => {
    expect(service).toBeTruthy();
  }));
});
