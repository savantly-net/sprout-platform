import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemBrowserDialogComponent } from './content-item-browser-dialog.component';

describe('ContentItemBrowserDialogComponent', () => {
  let component: ContentItemBrowserDialogComponent;
  let fixture: ComponentFixture<ContentItemBrowserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentItemBrowserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemBrowserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
