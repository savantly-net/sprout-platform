import { TestBed, inject } from '@angular/core/testing';

import { ServerPluginsService } from './server-plugins.service';

describe('ServerPluginsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerPluginsService]
    });
  });

  it('should be created', inject([ServerPluginsService], (service: ServerPluginsService) => {
    expect(service).toBeTruthy();
  }));
});
