import { TestBed, inject } from '@angular/core/testing';
import { ComponentTestModule } from '../../testing/component-test.module';
import { PageService } from './page.service';
import { PageContentService } from '../content/page-content.service';
import 'rxjs/add/operator/toPromise';

describe('PageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [PageContentService, PageService]
    });
  });

  it('should be created', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
