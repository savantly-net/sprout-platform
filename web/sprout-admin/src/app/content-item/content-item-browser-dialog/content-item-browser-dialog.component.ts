import { ContentItemService, ContentItem } from '../content-item.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

class ContentItemBrowserDialogResult {
  cancelled = true;
  value: any;
}

@Component({
  selector: 'app-content-item-browser-dialog',
  templateUrl: './content-item-browser-dialog.component.html',
  styleUrls: ['./content-item-browser-dialog.component.css']
})
export class ContentItemBrowserDialogComponent implements OnInit {

  filterText: string;
  result: ContentItemBrowserDialogResult = new ContentItemBrowserDialogResult();
  items: ContentItem[];

  select(item: ContentItem) {
    this.result.cancelled = false;
    this.result.value = item;
    this.doClose();
  }

  doClose() {
    this.dialogRef.close(this.result);
  }

  constructor(
    private service: ContentItemService,
    public dialogRef: MatDialogRef<ContentItemBrowserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    service.findAll().subscribe((response) => {
      this.items = response._embedded.contentItems;
    });
  }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.doClose();
    });
  }

}
