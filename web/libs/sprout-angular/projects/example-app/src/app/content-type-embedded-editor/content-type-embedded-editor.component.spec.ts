import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeEmbeddedEditorComponent } from './content-type-embedded-editor.component';

describe('ContentTypeEmbeddedEditorComponent', () => {
  let component: ContentTypeEmbeddedEditorComponent;
  let fixture: ComponentFixture<ContentTypeEmbeddedEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTypeEmbeddedEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypeEmbeddedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
