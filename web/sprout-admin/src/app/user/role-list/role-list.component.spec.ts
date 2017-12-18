import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../role.service';
import { PrivilegeService } from '../privilege.service';
import { StandardModule } from '../../standard/standard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RoleListComponent } from './role-list.component';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule, StandardModule],
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
