import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleService } from '../role.service';
import { PrivilegeService } from '../privilege.service';
import { ComponentTestModule } from '../../testing/component-test.module';


import { RoleListComponent } from './role-list.component';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      declarations: [ RoleListComponent ],
      providers: [RoleService, PrivilegeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
