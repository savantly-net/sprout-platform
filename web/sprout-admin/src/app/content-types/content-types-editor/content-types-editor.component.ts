import { ContentField, ContentFieldService } from '../../content-field/content-field.service';
import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { Identifiable } from '../../spring-data/rest-repository.service';
import { ContentTypesService, ContentType } from '../content-types.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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

  fieldTypes: any[];
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
      this.snackBar.open('Saved', 'Close', {duration: 8000});
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
      this.snackBar.open('Error while deleting the item', 'Close', {duration: 8000});
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
      const fieldControlGroup = this.fb.group(contentField);
      this.listenToContentFieldChanges(fieldControlGroup);
      this.fields.push(fieldControlGroup);
    });
  }

  listenToContentFieldChanges(fieldControl: FormGroup) {
    const source = fieldControl.valueChanges;
    const valueChangesubscription = source.subscribe(value => {
      this.contentFieldService.saveItem(fieldControl.value).subscribe(data => {
        this.snackBar.open('Auto-saved field properties', 'Close', {duration: 8000});
      }, err => {
        console.error('failed to save contentField');
      });
    });
  }

  get fields(): FormArray {
    return this.rForm.get('fields') as FormArray;
  }

  addField(): void {
    const field = new ContentField();
    field.name = 'body';
    field.displayName = 'Body field';
    field.fieldType = 'text';
    field.contentType = this.rForm.value._links.self.href;
    this.contentFieldService.saveItem(field).subscribe(data => {
      const fieldControlGroup = this.fb.group(data);
      this.listenToContentFieldChanges(fieldControlGroup);
      this.fields.push(fieldControlGroup);
    }, err => {
      console.error('failed to save contentField');
    });
  }

  removeFieldControl(index: number): void {
    this.service.deleteContentField(this.rForm.value, this.fields.at(index).value).subscribe(data => {
      this.fields.removeAt(index);
    }, err => {
      this.snackBar.open('Error while removing field', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  trackById(index: number, item: Identifiable) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: ContentTypesService,
    private contentFieldService: ContentFieldService) {

    this.service.getFieldTypes().subscribe((fieldTypes: any[]) => {
      this.fieldTypes = fieldTypes;
    }, (err) => { console.log('failed to retrieve Field Types'); } );

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyContentType', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new content type =]'],
      'requiresTemplate': [true],
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
