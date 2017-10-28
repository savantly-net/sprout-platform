import { TestBed, inject } from '@angular/core/testing';

import { AppMenuService } from './app-menu.service';

import { HttpClientModule } from '@angular/common/http';

describe('AppMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppMenuService]
    });
  });

  it('should be created', inject([AppMenuService], (service: AppMenuService) => {
    expect(service).toBeTruthy();
  }));
});
