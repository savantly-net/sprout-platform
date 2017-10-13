import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemEditorComponent } from './content-item-editor.component';
import { ContentItemService } from '../content-item.service';
import { ComponentTestModule } from '../../testing/component-test.module';
import { ContentTemplateModule } from '../../content-template/content-template.module';

describe('ContentItemEditorComponent', () => {
  let component: ContentItemEditorComponent;
  let fixture: ComponentFixture<ContentItemEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule, ContentTemplateModule],
      declarations: [ ContentItemEditorComponent ],
      providers: [ContentItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
