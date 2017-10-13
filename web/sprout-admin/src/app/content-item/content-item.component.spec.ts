import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemComponent } from './content-item.component';
import { ComponentTestModule } from '../testing/component-test.module';

describe('ContentItemsComponent', () => {
  let component: ContentItemComponent;
  let fixture: ComponentFixture<ContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      declarations: [ ContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
