import { Role, RoleService } from '../role.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  items: Role[];
  authority: string;

  addItem(): void {
    const role = new Role();
    role.authority = this.authority;
    this.roles.saveItem(role).subscribe(response => {
      console.log(response);
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

  getItems(): void {
    this.roles.findAll().subscribe(data => {
      this.items = data._embedded.roles;
    }, err => {
      console.error('Failed to get roles');
    });
  }

  constructor(private roles: RoleService, private snackBar: MatSnackBar) {
    this.getItems();
  }

  ngOnInit() {
  }

}
