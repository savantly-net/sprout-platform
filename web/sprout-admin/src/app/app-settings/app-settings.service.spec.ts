import { TestBed, inject } from '@angular/core/testing';

import { AppSettingsService } from './app-settings.service';
import { ComponentTestModule } from '../testing/component-test.module';

describe('AppSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [AppSettingsService]
    });
  });

  it('should be created', inject([AppSettingsService], (service: AppSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
