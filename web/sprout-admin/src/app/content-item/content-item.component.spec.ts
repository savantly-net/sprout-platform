import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTypeModule } from '../field-type/field-type.module';
import { ContentItemComponent } from './content-item.component';
import { ComponentTestModule } from '../testing/component-test.module';
import { ContentItemService } from './content-item.service';

describe('ContentItemsComponent', () => {
  let component: ContentItemComponent;
  let fixture: ComponentFixture<ContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule, FieldTypeModule],
      declarations: [ ContentItemComponent ],
      providers: [ContentItemService]
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
