import { TestBed, inject } from '@angular/core/testing';

import { ComponentTestModule } from '../testing/component-test.module';
import { ContentTemplateService } from './content-template.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContentTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [ContentTemplateService, HttpClientModule,]
    });
  });

  it('should be created', inject([ContentTemplateService], (service: ContentTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
