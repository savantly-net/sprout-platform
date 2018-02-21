import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEditorComponent } from './tenant-editor.component';

describe('TenantEditorComponent', () => {
  let component: TenantEditorComponent;
  let fixture: ComponentFixture<TenantEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
