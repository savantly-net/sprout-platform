import { Component, OnInit } from '@angular/core';
import { SproutUserService } from '../sprout-user.service';
import { ResourcePage } from '@lagoshny/ngx-hal-client';
import { UserResource } from '../sprout-user.resource';

@Component({
  selector: 'lib-sprout-user-list',
  templateUrl: './sprout-user-list.component.html',
  styleUrls: ['./sprout-user-list.component.scss']
})
export class SproutUserListComponent implements OnInit {

  usersPage: ResourcePage<UserResource>;

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
