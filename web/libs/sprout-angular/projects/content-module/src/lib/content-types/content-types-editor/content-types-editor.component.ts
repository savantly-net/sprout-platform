import { ContentField, ContentFieldService } from '../../content-field/content-field.service';
import { ContentTypesService, ContentType } from '../content-types.service';
import { Component, OnInit, Output, EventEmitter, ContentChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { pipe } from 'rxjs';
import { never } from 'rxjs';
import { AbstractContentFieldEditorComponent } from '../../content-field/';

@Component({
  selector: 'sprout-content-types-editor',
  templateUrl: './content-types-editor.component.html',
  styleUrls: ['./content-types-editor.component.css']
})
export class ContentTypesEditorComponent implements OnInit {

  //@ContentChildren('widget') fieldComponents: AbstractContentFieldEditorComponent[];

  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();
  fieldTypes: any[];
  rForm: FormGroup;

  prepareSave(model: ContentType): Promise<ContentType> {
    const halModel = Object.assign(new ContentType(), model);

    // first save fields
    const fieldsToSave = halModel.fields.map((field: ContentField) => {
      return this.saveField(field).toPromise()
    });
    return new Promise(resolve => {Promise.all(fieldsToSave).then(()=>{
      /* the HAL library should handle converting relations to urls rather 
      * than the entity objects. so we can probably dump this.
      halModel.fields = [];
      if (model.fields) {
        model.fields.map(field => {
          console.log(field);
          halModel.fields.push(field._links.self.href as any);
        });
      }
      console.log('halModel:', halModel);
      */
      resolve(halModel);
    })});
  }

  save(model: ContentType, close?: boolean) {
    this.prepareSave(model).then(halModel => {
      let saveObservable: Observable<ContentType | Observable<never>>;
      if (model.id) {
        saveObservable = this.service.update(halModel);
      } else {
        saveObservable = this.service.create(halModel);
      }
      saveObservable.subscribe(data => {
        console.log('saved content-type:', data);
        this.messageEmitter.emit({msg: 'Saved', code: 200});
        const contentType = (data as unknown as ContentType);
        if(close){
          this.close();
        } else {
          this.router.navigate(['content-type-editor', {id: contentType.id}]);
        }
      }, err => {
        if (err.statusText === 'Conflict') {
          this.messageEmitter.emit({msg: 'The template name must be unique', code: 409, err});
        }
      });
    });
  }

  close() {
    this.router.navigate(['content-type']);
  }

  delete(model: ContentType) {
    this.service.delete(model).subscribe(data => {
      this.close();
    }, err => {
      this.messageEmitter.emit({msg: 'Error while deleting the item', code: 500, err});
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.get(id).subscribe((response: ContentType) => {
        this.rForm.patchValue(response);
        this.rForm.patchValue({'new': false})
        this.service.findContentFields(response).subscribe(data => {
          this.setContentFields(data);
        }, err => {
          console.error('could not get contentFields for the contentType');
        });
      });
    }
  }

  setContentFields(contentFields: ContentField[]) {
    contentFields.map(contentField => {
      this.addField(contentField);
    });
  }

  get contentType(): ContentType {
    return Object.assign(new ContentType(), this.rForm.value);
  }

  get fields(): FormArray {
    return this.rForm.get('fields') as FormArray;
  }

  addField(contentField?: ContentField): void {
    if (!contentField) {
      contentField = new ContentField();
      contentField.name = 'body';
      contentField.displayName = 'Body field';
      contentField.fieldType = 'text';
      contentField.required = false;
    }
    const fieldControl = this.fb.control(contentField);
    this.fields.push(fieldControl);
  }

  saveField(field: ContentField): Observable<ContentField | Observable<never>> {
    let observable: Observable<ContentField | Observable<never>>;
    if (field.id) {
      observable = this.contentFieldService.update(field);
    } else {
      field.name = this.cleanFieldName(field);
      observable = this.contentFieldService.create(field);
    }
    return observable;
  }

  cleanFieldName(field: ContentField): string {
    const name = field.displayName ? field.displayName.toLowerCase().replace(/[^\w]/g, '') : '';
    return name + '_' + field.fieldType;
  }

  removeFieldControl(index: number): void {
    this.fields.removeAt(index);
  }

  trackById(index: number, item: {id: string}) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ContentTypesService,
    private contentFieldService: ContentFieldService) {

    this.service.getFieldTypes().subscribe((fieldTypes: any[]) => {
      this.fieldTypes = fieldTypes;
    }, (err) => { console.log('failed to retrieve Field Types'); } );

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyContentType', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new content type =]'],
      'requiresTemplate': [false],
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
