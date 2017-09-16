import { Component, OnInit } from '@angular/core';

export interface IUser {
  principal: string;
  displayName: string;
  authenticated: boolean;
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
