import { PageService } from './page.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'my-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input() pageId: string;

  @ViewChild('dataContainer') dataContainer: ElementRef;

  loadData(data) {
      this.dataContainer.nativeElement.innerHTML = data;
  }

  constructor(pageService: PageService) {
    if (this.pageId) {
      pageService.getPage(this.pageId);
    }
  }

  ngOnInit() {
  }

}
