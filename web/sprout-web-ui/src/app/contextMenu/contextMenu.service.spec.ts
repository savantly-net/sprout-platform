import { TestBed, inject } from '@angular/core/testing';

import { ContextMenuService } from './contextMenu.service';

describe('ContextMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextMenuService]
    });
  });

  it('should be created', inject([ContextMenuService], (service: ContextMenuService) => {
    expect(service).toBeTruthy();
  }));
});
