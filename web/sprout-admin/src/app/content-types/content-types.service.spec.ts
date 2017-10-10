import { TestBed, inject } from '@angular/core/testing';

import { ContentTypesService } from './content-types.service';

describe('ContentTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentTypesService]
    });
  });

  it('should be created', inject([ContentTypesService], (service: ContentTypesService) => {
    expect(service).toBeTruthy();
  }));
});
