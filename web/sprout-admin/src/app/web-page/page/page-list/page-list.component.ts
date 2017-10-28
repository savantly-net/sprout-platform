import { PageService, Page } from '../page.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
 items: Page[];

  addItem(): void {
    this.router.navigate(['page-editor']);
  }

  editItem(item: Page): void {
    this.router.navigate(['page-editor', {id: item.id}]);
  }

  deleteItem(item: Page): void {
    this.service.deleteItem(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.snackBar.open('Could not delete item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  getItems(): void {
    this.service.findAll().subscribe(data => {
      this.items = data._embedded.webPages;
    }, err => {
      console.error('Failed to get items');
    });
  }

  constructor(private router: Router, private service: PageService, private snackBar: MatSnackBar) {
    this.getItems();
  }

  ngOnInit() {
  }
}
