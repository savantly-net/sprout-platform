import { User, UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  items: User[];

  addItem(): void {
    this.router.navigate(['user-editor']);
  }

  editItem(item: User): void {
    this.router.navigate(['user-editor', {id: item.id}]);
  }

  deleteItem(item: User): void {
    this.users.deleteItem(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.snackBar.open('Could not delete item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  getItems(): void {
    this.users.findAll().subscribe(data => {
      this.items = data._embedded.users;
    }, err => {
      console.error('Failed to get users');
    });
  }

  constructor(private router: Router, private users: UserService, private snackBar: MatSnackBar) {
    this.getItems();
  }

  ngOnInit() {
  }

}
