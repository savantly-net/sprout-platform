import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTestModule } from '../../testing/component-test.module';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      declarations: [ UserListComponent ],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
