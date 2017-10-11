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

  constructor(private router: Router, private contentTemplateService: ContentTemplateService) { }

  ngOnInit() {
    this.contentTemplateService.findAll().next((response) => {
      this.items = response._embedded.contentTemplates;
    });
  }

}
