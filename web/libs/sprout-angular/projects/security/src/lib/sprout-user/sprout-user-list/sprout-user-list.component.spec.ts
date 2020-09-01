import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproutUserListComponent } from './sprout-user-list.component';

describe('SproutUserListComponent', () => {
  let component: SproutUserListComponent;
  let fixture: ComponentFixture<SproutUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproutUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproutUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
