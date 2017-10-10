import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemsComponent } from './content-items.component';

describe('ContentItemsComponent', () => {
  let component: ContentItemsComponent;
  let fixture: ComponentFixture<ContentItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
