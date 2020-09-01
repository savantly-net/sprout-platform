import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproutRoleEditorComponent } from './sprout-role-editor.component';

describe('SproutRoleEditorComponent', () => {
  let component: SproutRoleEditorComponent;
  let fixture: ComponentFixture<SproutRoleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproutRoleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproutRoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
