import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { PageService } from './page.service';

describe('PageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PageService]
    });
  });

  it('should be created', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
