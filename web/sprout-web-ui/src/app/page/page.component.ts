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

  constructor(private pageService: PageService) { }

  ngOnInit() {
    if (this.pageId) {
      this.pageService.getPage(this.pageId).subscribe((content) => {
        this.loadData(content);
      });
    } else {
      this.pageService.getHomePage().subscribe((content) => {
        this.loadData(content);
      });
    }
  }

}
