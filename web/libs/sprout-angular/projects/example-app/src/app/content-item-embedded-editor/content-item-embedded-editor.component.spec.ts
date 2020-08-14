import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemEmbeddedEditorComponent } from './content-item-embedded-editor.component';

describe('ContentItemEmbeddedEditorComponent', () => {
  let component: ContentItemEmbeddedEditorComponent;
  let fixture: ComponentFixture<ContentItemEmbeddedEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentItemEmbeddedEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemEmbeddedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
