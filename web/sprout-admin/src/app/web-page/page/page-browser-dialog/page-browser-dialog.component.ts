import { FilterPipe } from '../../../standard/pipes/filter.pipe';
import { PageService, Page } from '../page.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export class PageBrowserDialogResult {
  cancelled = true;
  value: any;
}

@Component({
  selector: 'app-page-browser-dialog',
  templateUrl: './page-browser-dialog.component.html',
  styleUrls: ['./page-browser-dialog.component.css']
})
export class PageBrowserDialogComponent implements OnInit {

  filterText: string;
  result: PageBrowserDialogResult = new PageBrowserDialogResult();
  pages: Page[];

  select(page: Page) {
    this.result.cancelled = false;
    this.result.value = '/page/' + page.id;
    this.doClose();
  }

  doClose() {
    this.dialogRef.close(this.result);
  }

  constructor(
    private pageService: PageService,
    public dialogRef: MatDialogRef<PageBrowserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    pageService.findAll().subscribe((response) => {
      this.pages = response._embedded.webPages;
    });
  }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.doClose();
    });
  }

}
