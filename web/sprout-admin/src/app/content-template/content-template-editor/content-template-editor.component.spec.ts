import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTemplateEditorComponent } from './content-template-editor.component';

describe('ContentTemplateEditorComponent', () => {
  let component: ContentTemplateEditorComponent;
  let fixture: ComponentFixture<ContentTemplateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTemplateEditorComponent ]
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
