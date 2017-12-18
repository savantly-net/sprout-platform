import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEditorComponent } from './role-editor.component';
import { RoleService } from '../role.service';
import { PrivilegeService } from '../privilege.service';
import { ComponentTestModule } from '../../testing/component-test.module';

describe('RoleEditorComponent', () => {
  let component: RoleEditorComponent;
  let fixture: ComponentFixture<RoleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      declarations: [ RoleEditorComponent ],
      providers: [RoleService, PrivilegeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
