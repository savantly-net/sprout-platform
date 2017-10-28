import { TestBed, inject } from '@angular/core/testing';

import { ContentTypesService } from './content-types.service';
import { ComponentTestModule } from '../testing/component-test.module';

describe('ContentTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [ContentTypesService]
    });
  });

  it('should be created', inject([ContentTypesService], (service: ContentTypesService) => {
    expect(service).toBeTruthy();
  }));
});
