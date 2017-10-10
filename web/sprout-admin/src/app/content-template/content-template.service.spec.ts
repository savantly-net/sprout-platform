import { TestBed, inject } from '@angular/core/testing';

import { ContentTemplateService } from './content-template.service';

describe('ContentTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentTemplateService]
    });
  });

  it('should be created', inject([ContentTemplateService], (service: ContentTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
