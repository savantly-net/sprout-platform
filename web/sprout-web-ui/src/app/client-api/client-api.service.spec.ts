import { TestBed, inject } from '@angular/core/testing';

import { ClientApiService } from './client-api.service';

describe('ClientApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientApiService]
    });
  });

  it('should be created', inject([ClientApiService], (service: ClientApiService) => {
    expect(service).toBeTruthy();
  }));
});
