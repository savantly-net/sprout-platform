import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproutRoleListComponent } from './sprout-role-list.component';

describe('SproutRoleListComponent', () => {
  let component: SproutRoleListComponent;
  let fixture: ComponentFixture<SproutRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproutRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproutRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
