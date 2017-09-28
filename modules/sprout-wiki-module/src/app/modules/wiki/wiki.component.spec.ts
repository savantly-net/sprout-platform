import { WikiModule } from './wiki.module';
import { WikiComponent } from './wiki.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin';

describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WikiModule],
      providers: [SproutPluginRegistryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
