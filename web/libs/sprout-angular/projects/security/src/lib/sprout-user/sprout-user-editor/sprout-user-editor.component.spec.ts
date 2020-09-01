import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproutUserEditorComponent } from './sprout-user-editor.component';

describe('SproutUserEditorComponent', () => {
  let component: SproutUserEditorComponent;
  let fixture: ComponentFixture<SproutUserEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproutUserEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproutUserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
