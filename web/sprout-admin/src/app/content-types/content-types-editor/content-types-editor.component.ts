import { ContentField, ContentFieldService } from '../../content-field/content-field.service';
import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentTypesService, ContentType } from '../content-types.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-content-types-editor',
  templateUrl: './content-types-editor.component.html',
  styleUrls: ['./content-types-editor.component.css']
})
export class ContentTypesEditorComponent implements OnInit {

  fieldTypes: string[] = ['text'];
  rForm: FormGroup;

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    halModel.fields = [];
    if (model.fields) {
      model.fields.map(field => {
        console.log(field);
        halModel.fields.push(field._links.self.href);
      });
    }
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      this.router.navigate(['content-types-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The template name must be unique', 'Close', {duration: 8000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['content-types']);
    }, err => {
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
        this.service.findContentFields(response).subscribe(data => {
          this.setContentFields(data._embedded.contentFields);
        }, err => {
          console.error('could not get contentFields for the contentType');
        });
      });
    }
  }

  setContentFields(contentFields: ContentField[]) {
    contentFields.map(contentField => {
      this.fields.push(this.fb.group(contentField));
    });
  }

  get fields(): FormArray {
    return this.rForm.get('fields') as FormArray;
  }

  addField(): void {
    const field = new ContentField();
    field.name = 'text';
    field.displayName = 'Text field';
    field.fieldType = 'text';
    field.contentType = this.rForm.value._links.self.href;
    this.contentFieldService.saveItem(field).subscribe(data => {
      this.fields.push(this.fb.group(data));
    }, err => {
      console.error('failed to save contentField');
    });
  }

  removeFieldControl(index: number): void {
    this.fields.removeAt(index);
  }

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: ContentTypesService,
    private contentFieldService: ContentFieldService) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyContentType', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new content type =]'],
      'fields': fb.array([]),
      'new': [true],
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null],
      '_links': [null],
      '_embedded': [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.loadItem(params['id']) );
  }

}
