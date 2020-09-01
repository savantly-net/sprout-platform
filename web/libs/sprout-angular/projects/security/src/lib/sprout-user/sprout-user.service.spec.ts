import { TestBed } from '@angular/core/testing';

import { SproutUserService } from './sprout-user.service';

describe('SproutUserServiceService', () => {
  let service: SproutUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SproutUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
