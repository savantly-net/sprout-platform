import { Layout, LayoutService } from '../layout.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-list',
  templateUrl: './layout-list.component.html',
  styleUrls: ['./layout-list.component.css']
})
export class LayoutListComponent implements OnInit {
  items: Layout[];

  addItem(): void {
    this.router.navigate(['layout-editor']);
  }

  editItem(item: Layout): void {
    this.router.navigate(['layout-editor', {id: item.id}]);
  }

  deleteItem(item: Layout): void {
    this.service.deleteItem(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.snackBar.open('Could not delete item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  getItems(): void {
    this.service.findAll().subscribe(data => {
      this.items = data._embedded.webPageLayouts;
    }, err => {
      console.error('Failed to get items');
    });
  }

  constructor(private router: Router, private service: LayoutService, private snackBar: MatSnackBar) {
    this.getItems();
  }

  ngOnInit() {
  }


}
