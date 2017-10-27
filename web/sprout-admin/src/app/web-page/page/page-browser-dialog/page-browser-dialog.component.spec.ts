import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBrowserDialogComponent } from './page-browser-dialog.component';

describe('PageBrowserDialogComponent', () => {
  let component: PageBrowserDialogComponent;
  let fixture: ComponentFixture<PageBrowserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBrowserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBrowserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
