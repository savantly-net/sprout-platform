import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorComponent } from './user-editor.component';
import { MaterialModule } from '../../material/material.module';
import { ComponentTestModule } from '../../testing/component-test.module';
import { UserService } from '../user.service';
import { EmailService } from '../email-service';

describe('UserEditorComponent', () => {
  let component: UserEditorComponent;
  let fixture: ComponentFixture<UserEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ComponentTestModule],
      declarations: [ UserEditorComponent ],
      providers: [UserService, EmailService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
