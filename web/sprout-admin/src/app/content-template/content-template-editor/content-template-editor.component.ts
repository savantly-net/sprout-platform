import { ContentTypesService } from '../../content-types/content-types.service';
import { ContentTemplate, ContentTemplateService } from '../content-template.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-template-editor',
  templateUrl: './content-template-editor.component.html',
  styleUrls: ['./content-template-editor.component.css']
})
export class ContentTemplateEditorComponent implements OnInit {
  rForm: FormGroup;

  save(model) {
    this.service.saveItem(model).subscribe((response) => {
      console.log(response);
      this.router.navigate(['content-template-editor', {id: response.id}]);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ContentTemplateService) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyTemplate', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'content' : ['<h1>${text}</h1>', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new template =]'],
      'new': [true],
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.loadItem(params['id']) );
  }

}
