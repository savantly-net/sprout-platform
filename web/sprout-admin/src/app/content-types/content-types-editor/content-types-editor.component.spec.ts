import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTestModule } from '../../testing/component-test.module';
import { ContentTypesEditorComponent } from './content-types-editor.component';
import { ContentTypesService } from '../content-types.service';
import { ContentFieldModule } from '../../content-field/content-field.module';
import { ContentTemplateModule } from '../../content-template/content-template.module';

describe('ContentTypesEditorComponent', () => {
  let component: ContentTypesEditorComponent;
  let fixture: ComponentFixture<ContentTypesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule, ContentTemplateModule, ContentFieldModule],
      declarations: [ ContentTypesEditorComponent ],
      providers: [ContentTypesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
