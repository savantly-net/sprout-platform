import { TestBed, inject } from '@angular/core/testing';

import { ContentTemplateService } from './content-template.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContentTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentTemplateService, HttpClientModule,]
    });
  });

  it('should be created', inject([ContentTemplateService], (service: ContentTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
