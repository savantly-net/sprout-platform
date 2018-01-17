import { PrivilegeService, Privilege } from '../privilege.service';
import { Role, RoleService } from '../role.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  items: Role[];
  authority: string;
  privileges: Privilege[];

  keyPress(event: any) {
    if (event.keyCode === 13) {
      this.addItem();
    }
  }

  addItem(): void {
    const role = new Role();
    role.id = this.authority;
    this.roles.saveItem(role).subscribe(response => {
      console.log(response);
      this.getItems();
      this.authority = '';
    });
  }

  deleteItem(item: Role): void {
    this.roles.deleteItem(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.snackBar.open('Could not delete item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  editItem(item: Role): void {
    this.router.navigate(['role-editor', {id: item.id}]);
  }

  getItems(): void {
    this.roles.findAll().subscribe(data => {
      this.items = data._embedded.roles;
    }, err => {
      console.error('Failed to get roles', err);
    });
  }

  getPrivileges(): void {
    this.privs.findAll().subscribe(response => {
      this.privileges = response._embedded.privileges;
    }, err => {
      console.log('Failed to get privileges', err);
    });
  }

  constructor(
    public router: Router,
    private roles: RoleService,
    private privs: PrivilegeService,
    private snackBar: MatSnackBar) {
    this.getItems();
    this.getPrivileges();
  }

  ngOnInit() {
  }

}
