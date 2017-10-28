import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTestModule } from '../testing/component-test.module';

import { ContentTemplateComponent } from './content-template.component';
import { ContentTemplateService } from './content-template.service';

describe('ContentTemplateComponent', () => {
  let component: ContentTemplateComponent;
  let fixture: ComponentFixture<ContentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTemplateComponent ],
      imports: [ ComponentTestModule ],
      providers: [ ContentTemplateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
