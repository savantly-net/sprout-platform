import { TestBed, inject } from '@angular/core/testing';

import { ContentFieldService } from './content-field.service';
import { ComponentTestModule } from '../testing/component-test.module';

describe('ContentFieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [ContentFieldService]
    });
  });

  it('should be created', inject([ContentFieldService], (service: ContentFieldService) => {
    expect(service).toBeTruthy();
  }));
});
