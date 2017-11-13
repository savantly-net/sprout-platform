import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { StandardModule } from '../standard/standard.module';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StandardModule],
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
