import { TestBed } from '@angular/core/testing';

import { ContentModuleService } from './content-module.service';

describe('ContentModuleService', () => {
  let service: ContentModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
