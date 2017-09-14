import { Component, OnInit } from '@angular/core';

export class User {
  name: string;
  roles: string[];
}

@Component({
  selector: 'my-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
