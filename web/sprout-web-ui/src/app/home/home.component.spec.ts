// This shows a different way of testing a component, check about for a simpler one
import { PageComponent } from '../page/page.component';
import { PageService } from '../page/page.service';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';

@Component({selector: 'my-test', template: ''})
class TestComponent { }

describe('Home Component', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PageComponent, HomeComponent, TestComponent],
      providers: [PageService]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].children[0].tagName).toBe('DIV');
  });

});


