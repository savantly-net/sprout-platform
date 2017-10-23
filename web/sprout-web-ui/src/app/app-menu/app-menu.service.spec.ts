import { TestBed, inject } from '@angular/core/testing';

import { AppMenuService } from './app-menu.service';

describe('AppMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppMenuService]
    });
  });

  it('should be created', inject([AppMenuService], (service: AppMenuService) => {
    expect(service).toBeTruthy();
  }));
});
