import { ContentTypesService } from '../../content-types/content-types.service';
import { ContentTemplate, ContentTemplateService } from '../content-template.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-template-editor',
  templateUrl: './content-template-editor.component.html',
  styleUrls: ['./content-template-editor.component.css']
})
export class ContentTemplateEditorComponent implements OnInit {

  item: ContentTemplate;
  rForm: FormGroup;
  post: any; // A property for our submitted form

  // model fields
  description: string;
  name: string;
  template: ContentTemplate;
  icon: string;
  // end model fields

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

  loadItem(id: string) {
    if (id) {
      this.item = this.service.items[0];
    } else {
      this.item = new ContentTemplate();
    }
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ContentTemplateService) {

    this.route.params.subscribe( params => this.loadItem(params['id']) );

    this.rForm = fb.group({
      'name' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
    });
  }

  ngOnInit() {
  }

}
