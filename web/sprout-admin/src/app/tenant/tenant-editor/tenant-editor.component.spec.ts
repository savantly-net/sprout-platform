import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEditorComponent } from './tenant-editor.component';
import { ComponentTestModule } from '../../testing/component-test.module';
import { TenantService } from '../tenant.service';

describe('TenantEditorComponent', () => {
  let component: TenantEditorComponent;
  let fixture: ComponentFixture<TenantEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [TenantService],
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
