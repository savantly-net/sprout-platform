import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTestModule } from '../testing/component-test.module'
import { AppMenuComponent } from './app-menu.component';
import { AppMenuService } from './app-menu.service';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule ],
      providers: [AppMenuService],
      declarations: [ AppMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
