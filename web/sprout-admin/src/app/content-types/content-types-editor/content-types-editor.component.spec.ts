import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypesEditorComponent } from './content-types-editor.component';

describe('ContentTypesEditorComponent', () => {
  let component: ContentTypesEditorComponent;
  let fixture: ComponentFixture<ContentTypesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTypesEditorComponent ]
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
