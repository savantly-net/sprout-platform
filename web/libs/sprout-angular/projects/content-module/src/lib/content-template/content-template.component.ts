import { ContentTemplateService, ContentTemplate } from './content-template.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sprout-content-template',
  templateUrl: './content-template.component.html',
  styleUrls: ['./content-template.component.css']
})
export class ContentTemplateComponent implements OnInit {
  items: ContentTemplate[];

  addItem(): void {
    this.router.navigate(['content-template', 'new']);
  }

  editItem(item: ContentTemplate): void {
    this.router.navigate(['content-template', item.id, 'edit']);
  }

  deleteItem(item: ContentTemplate): void {
    if(confirm('Are you sure?')){
      this.contentTemplateService.delete(item).subscribe(data => {
        this.getContentTemplates();
      }, err => {
        console.error('Failed to delete contentTemplate');
      });
    }
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
