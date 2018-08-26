import { ComponentTestModule } from '../testing/component-test.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApiComponent } from './client-api.component';
import { ClientApiService } from './client-api.service';
import { DynamicModule } from '../dynamic/dynamic.module';

describe('ClientApiComponent', () => {
  let component: ClientApiComponent;
  let fixture: ComponentFixture<ClientApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule, DynamicModule],
      declarations: [ ClientApiComponent ],
      providers: [ClientApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
