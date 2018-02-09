import { ComponentTestModule } from '../testing/component-test.module';
import { TestBed, inject } from '@angular/core/testing';

import { ClientApiService } from './client-api.service';

describe('ClientApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ComponentTestModule ],
      providers: [ClientApiService]
    });
  });

  it('should be created', inject([ClientApiService], (service: ClientApiService) => {
    expect(service).toBeTruthy();
  }));
});
