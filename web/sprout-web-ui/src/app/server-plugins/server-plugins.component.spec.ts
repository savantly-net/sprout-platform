import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPluginsComponent } from './server-plugins.component';

describe('ServerPluginsComponent', () => {
  let component: ServerPluginsComponent;
  let fixture: ComponentFixture<ServerPluginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerPluginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerPluginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
