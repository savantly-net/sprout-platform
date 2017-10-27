import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutListComponent } from './layout-list.component';
import { ComponentTestModule } from '../../../testing/component-test.module';
import { LayoutService } from '../layout.service';

describe('LayoutListComponent', () => {
  let component: LayoutListComponent;
  let fixture: ComponentFixture<LayoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers:[LayoutService ],
      declarations: [ LayoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
