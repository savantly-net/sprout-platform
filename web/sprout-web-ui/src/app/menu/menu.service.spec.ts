import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));

  it('should be have a default menu created', inject([MenuService], (service: MenuService) => {
    expect(service.menus.length).toBe(1);
  }));

});
