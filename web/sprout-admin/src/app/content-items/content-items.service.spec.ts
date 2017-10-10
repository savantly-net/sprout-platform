import { TestBed, inject } from '@angular/core/testing';

import { ContentItemsService } from './content-items.service';

describe('ContentItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentItemsService]
    });
  });

  it('should be created', inject([ContentItemsService], (service: ContentItemsService) => {
    expect(service).toBeTruthy();
  }));
});
