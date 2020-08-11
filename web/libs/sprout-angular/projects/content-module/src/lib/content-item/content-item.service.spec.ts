import { TestBed, inject } from '@angular/core/testing';

import { ContentItemService } from './content-item.service';
import { ComponentTestModule } from '../testing/component-test.module';

describe('ContentItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [ContentItemService]
    });
  });

  it('should be created', inject([ContentItemService], (service: ContentItemService) => {
    expect(service).toBeTruthy();
  }));
});
