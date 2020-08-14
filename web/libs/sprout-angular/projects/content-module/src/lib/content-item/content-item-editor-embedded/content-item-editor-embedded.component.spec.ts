import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTypeModule } from '../../field-type/field-type.module';
import { ContentItemEditorEmbeddedComponent } from './content-item-editor-embedded.component';
import { ContentItemService, ContentItem } from '../content-item.service';
import { ComponentTestModule } from '../../testing/component-test.module';
import { ContentTemplateModule } from '../../content-template/content-template.module';
import { ContentTypesModule } from '../../content-types/content-types.module';

describe('ContentItemEditorEmbeddedComponent', () => {
  let component: ContentItemEditorEmbeddedComponent;
  let fixture: ComponentFixture<ContentItemEditorEmbeddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule, FieldTypeModule, ContentTemplateModule, ContentTypesModule],
      declarations: [ ContentItemEditorEmbeddedComponent ],
      providers: [ContentItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemEditorEmbeddedComponent);
    component = fixture.componentInstance;
    component.contentItem = new ContentItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
