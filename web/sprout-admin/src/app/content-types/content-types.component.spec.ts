import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypesService } from './content-types.service';
import { ContentTypesComponent } from './content-types.component';
import { ComponentTestModule } from '../testing/component-test.module';
import { ContentFieldModule } from '../content-field/content-field.module';

describe('ContentTypesComponent', () => {
  let component: ContentTypesComponent;
  let fixture: ComponentFixture<ContentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule, ContentFieldModule],
      declarations: [ ContentTypesComponent ],
      providers: [ContentTypesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
