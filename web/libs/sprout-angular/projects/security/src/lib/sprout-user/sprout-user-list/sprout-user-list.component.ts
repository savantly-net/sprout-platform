import { Component, OnInit } from '@angular/core';
import { SproutUserService, SproutUser } from '../sprout-user.service';
import { ResourcePage } from '@lagoshny/ngx-hal-client';

@Component({
  selector: 'lib-sprout-user-list',
  templateUrl: './sprout-user-list.component.html',
  styleUrls: ['./sprout-user-list.component.scss']
})
export class SproutUserListComponent implements OnInit {

  usersPage: ResourcePage<SproutUser>;

  constructor(protected userService: SproutUserService) { 
    this.userService.getAllPage().subscribe(users => {
      this.usersPage = users;
    })
  }

  trackId(index: number, item: any) {
    return item.id;
  }

  ngOnInit(): void {
  }

}
