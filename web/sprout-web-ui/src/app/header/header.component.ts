import { Component, OnInit } from '@angular/core';
import { SecurityService } from '@savantly/ngx-security';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  security: SecurityService;

  constructor(security: SecurityService) {
    this.security = security;
  }

  ngOnInit() {
  }

}
