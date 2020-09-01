import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproutUserDetailComponent } from './sprout-user-detail.component';

describe('SproutUserDetailComponent', () => {
  let component: SproutUserDetailComponent;
  let fixture: ComponentFixture<SproutUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproutUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproutUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
