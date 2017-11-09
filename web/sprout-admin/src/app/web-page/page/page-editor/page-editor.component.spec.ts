import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTestModule } from '../../../testing/component-test.module';
import { PageEditorComponent } from './page-editor.component';
import { PageService } from '../page.service';
import { PageContentService } from '../../content/page-content.service';
import { LayoutService } from '../../layout/layout.service';
import { ContentItemService } from '../../../content-item/content-item.service';

describe('PageEditorComponent', () => {
  let component: PageEditorComponent;
  let fixture: ComponentFixture<PageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      declarations: [ PageEditorComponent ],
      providers: [PageService, PageContentService, LayoutService, ContentItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
