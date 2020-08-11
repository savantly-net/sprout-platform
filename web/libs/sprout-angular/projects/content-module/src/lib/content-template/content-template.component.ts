import { ContentTemplateService, ContentTemplate } from './content-template.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-template',
  templateUrl: './content-template.component.html',
  styleUrls: ['./content-template.component.css']
})
export class ContentTemplateComponent implements OnInit {
  items: ContentTemplate[];

  addItem(): void {
    this.router.navigate(['content-template-editor']);
  }

  editItem(item: ContentTemplate): void {
    this.router.navigate(['content-template-editor', {id: item.id}]);
  }

  deleteItem(item: ContentTemplate): void {
    this.contentTemplateService.delete(item).subscribe(data => {
      this.getContentTemplates();
    }, err => {
      console.error('Failed to delete contentTemplate');
    });
  }

  getContentTemplates(): void {
    this.contentTemplateService.getAll().subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.error(err);
    });
  }

  constructor(private router: Router, private contentTemplateService: ContentTemplateService) { }

  ngOnInit() {
    console.log('Initializing');
    this.getContentTemplates();
  }

}
