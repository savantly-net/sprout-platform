import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  @Input() menu: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
