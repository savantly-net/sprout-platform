import { ContentField } from '../../content-field/content-field.service';
import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentTypesService, ContentType } from '../../content-types/content-types.service';
import { Identifiable } from '../../spring-data/rest-repository.service';
import { ContentItemService, ContentItem } from '../content-item.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-content-item-editor',
  templateUrl: './content-item-editor.component.html',
  styleUrls: ['./content-item-editor.component.css']
})
export class ContentItemEditorComponent implements OnInit {

  rForm: FormGroup;
  _templates: BehaviorSubject<ContentTemplate[]> = new BehaviorSubject<ContentTemplate[]>([]);
  templates: Observable<ContentTemplate[]> = this._templates.asObservable();
  contentTypes: ContentType[];

  emptyFormDefinition = {
      'id' : [''],
      'name' : ['My Cool Content Item', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new piece of content'],
      'fieldValues': this.fb.array([]),
      'new': [true],
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null],
      'contentType': {
        'id': [null],
        'name': [null],
        '_links': {
          'self': {
            'href': [null]
          }
        }
      },
      'template': {
        'id': null,
        'name': null,
        '_links': {
          'self': {
            'href': null
          }
        }
      },
      '_embedded': [null],
      '_links': [null]
    };

  getContentTemplates(): void {
    this.contentTemplateService.findAll().subscribe(data => {
      console.log(data);
      this._templates.next(data._embedded.contentTemplates);
    }, err => {
      this.snackBar.open('The Content Templates could not be retrieved', 'Close', {duration: 8000});
      console.error('Failed to get contentTemplates');
    });
  }

  getContentTypes(): void {
    this.contentTypeService.findAll().subscribe(data => {
      this.contentTypes = data._embedded.contentTypes;
    }, err => {
       this.snackBar.open('The Content Types could not be retrieved', 'Close', {duration: 8000});
    });
  }

  prepareSave(model): any {
    const halModel = Object.assign({}, model);

    halModel.fieldValues = {};
    this.fieldValues.controls.map(control => {
      halModel.fieldValues[control.value.id] = control.value.value;
    });
    halModel.contentType = this.currentContentType.value._links.self.href;
    delete halModel.template;
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      if (this.currentTemplate.value.id != null) {
        this.service.setContentTemplate(data, this.currentTemplate.value).subscribe(contentItem => {
// need to do anything here?
        }, err => {
          console.error(err);
        });
      } else {
        this.router.navigate(['content-item-editor', {id: data.id}]);
      }
      this.snackBar.open('Saved', 'Close', {duration: 8000});
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The item name must be unique', 'Close', {duration: 8000});
      } else {
        this.snackBar.open(err, 'Close', {duration: 8000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['content-item']);
    }, err => {
      this.snackBar.open('Problem encountered while deleting', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((contentItem: any) => {
        this.service.getContentType(contentItem).subscribe(contentType => {
          contentItem.contentType = contentType;
          this.getContentTypeFields(<ContentType>contentType, (contentFields) => {
            const obs = this.service.getContentTemplate(contentItem);
            obs.finally(() => { this.createFormFromExisting(contentItem, contentFields); })
              .subscribe(contentTemplate => {
              contentItem.template = contentTemplate;
            }, err => { this.snackBar.open('Please set Content Template', 'Close', {duration: 8000}); console.error(err); });
          });
        }, err => {
          this.snackBar.open('Could not retrieve Content Type', 'Close', {duration: 8000});
          console.error(err);
        });
      }, err => {
        this.snackBar.open('Could not retrieve Content Item', 'Close', {duration: 8000});
        console.error(err);
      });
    } else {
      this.createEmptyForm();
    }
  }

  get fieldValues(): FormArray {
    return this.rForm.get('fieldValues') as FormArray;
  }

  setFieldValue(key: string, value: string) {
    this.fieldValues.get(key).setValue(value);
  }

  get currentTemplate(): FormControl {
    return this.rForm.get('template') as FormControl;
  }

  get currentContentType(): FormControl {
    const ctrl = this.rForm.get('contentType') as FormControl;
    ctrl.disable();
    return ctrl;
  }

  getContentTypeFields(contentType: ContentType, callback): void {
    this.contentTypeService.findContentFields(contentType).subscribe(data => {
      const fields = data._embedded.contentFields;
      callback(fields);
    }, err => {
      this.snackBar.open('Could not retrieve Content Type Fields', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  createEmptyForm() {
    this.rForm = this.fb.group(this.emptyFormDefinition);
  }

  createFormFromExisting(contentItem: ContentItem, contentFields: ContentField[]): void {
    const formDefinition = Object.assign({}, this.emptyFormDefinition);
    contentFields.map(field => {
      field['value'] = [contentItem.fieldValues[field.id]];
      const fg = this.fb.group(field);
      formDefinition.fieldValues.push(fg);
    });
    this.rForm = this.fb.group(formDefinition);
    this.patchValues(contentItem);
  }

  patchValues(contentItem) {
    const valueMap = Object.assign({}, contentItem.fieldValues);
    delete contentItem.fieldValues;
    this.rForm.patchValue(contentItem);
    this.currentContentType.patchValue(contentItem.contentType);
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
    private contentTemplateService: ContentTemplateService,
    private service: ContentItemService,
    private contentTypeService: ContentTypesService) {
    this.getContentTemplates();
    this.getContentTypes();
  }

  ngOnInit() {

    this.route.params.subscribe( params => this.loadItem(params['id']) );
  }

}
