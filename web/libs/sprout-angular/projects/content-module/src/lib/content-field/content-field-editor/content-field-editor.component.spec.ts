import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFieldEditorComponent } from './content-field-editor.component';

describe('ContentFieldEditorComponent', () => {
  let component: ContentFieldEditorComponent;
  let fixture: ComponentFixture<ContentFieldEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFieldEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFieldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
