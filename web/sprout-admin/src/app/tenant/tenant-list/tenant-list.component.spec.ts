import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantListComponent } from './tenant-list.component';
import { ComponentTestModule } from '../../testing/component-test.module';
import { TenantService } from '../tenant.service';

describe('TenantListComponent', () => {
  let component: TenantListComponent;
  let fixture: ComponentFixture<TenantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentTestModule],
      providers: [TenantService],
      declarations: [ TenantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
