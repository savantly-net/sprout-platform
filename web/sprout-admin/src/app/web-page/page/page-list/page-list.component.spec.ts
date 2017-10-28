import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTestModule } from '../../../testing/component-test.module';
import { PageListComponent } from './page-list.component';
import { PageService } from '../page.service';
import { PageContentService } from '../../content/page-content.service';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      declarations: [ PageListComponent ],
      providers:[PageService, PageContentService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
