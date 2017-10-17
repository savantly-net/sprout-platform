import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditoryComponent } from './page-editory.component';

describe('PageEditoryComponent', () => {
  let component: PageEditoryComponent;
  let fixture: ComponentFixture<PageEditoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
