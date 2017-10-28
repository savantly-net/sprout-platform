import { ContentTypesService, ContentType } from './content-types.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-types',
  templateUrl: './content-types.component.html',
  styleUrls: ['./content-types.component.css']
})
export class ContentTypesComponent implements OnInit {

  items: ContentType[];

  addItem(): void {
    this.router.navigate(['content-types-editor']);
  }

  editItem(item: ContentType): void {
    this.router.navigate(['content-types-editor', {id: item.id}]);
  }

  deleteItem(item: ContentType): void {
    this.contentTypes.deleteItem(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.snackBar.open('Could not delete item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  getItems(): void {
    this.contentTypes.findAll().subscribe(data => {
      this.items = data._embedded.contentTypes;
    }, err => {
      console.error('Failed to get contentTypes');
    });
  }

  constructor(private router: Router, private contentTypes: ContentTypesService, private snackBar: MatSnackBar) {
    this.getItems();
  }

  ngOnInit() {
  }

}
