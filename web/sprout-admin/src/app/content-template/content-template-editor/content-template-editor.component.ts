import { ContentTypesService } from '../../content-types/content-types.service';
import { ContentTemplate, ContentTemplateService } from '../content-template.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-content-template-editor',
  templateUrl: './content-template-editor.component.html',
  styleUrls: ['./content-template-editor.component.css']
})
export class ContentTemplateEditorComponent implements OnInit {
  rForm: FormGroup;
  content: string;

  save(model) {
    model.content = this.content;
    this.service.saveItem(model).subscribe(data => {
      this.router.navigate(['content-template-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The template name must be unique', 'Close', {duration: 8000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['content-template']);
    }, err => {
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
        this.content = response.content;
      });
    }
  }

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ContentTemplateService,
    private snackBar: MatSnackBar) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyTemplate', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
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
