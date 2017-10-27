import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTemplateEditorComponent } from './content-template-editor.component';
import { ContentTemplateService } from '../content-template.service';
import { ComponentTestModule } from '../../testing/component-test.module';
import { CKEditorModule } from 'ng2-ckeditor';

describe('ContentTemplateEditorComponent', () => {
  let component: ContentTemplateEditorComponent;
  let fixture: ComponentFixture<ContentTemplateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTemplateEditorComponent ],
      imports: [ ComponentTestModule, CKEditorModule ],
      providers: [ ContentTemplateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTemplateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
