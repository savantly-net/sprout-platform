import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentField } from '../../content-field/content-field.service';
import { uuid } from '../../standard';
import { ContentType, ContentTypesService } from '../content-types.service';

@Component({
  selector: 'sprout-content-types-editor',
  templateUrl: './content-types-editor.component.html',
  styleUrls: ['./content-types-editor.component.css']
})
export class ContentTypesEditorComponent implements OnInit {
  
  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();
  fieldTypes: any[];
  rForm: FormGroup;

  save(model: ContentType, close?: boolean) {
    const contentType = Object.assign({}, model);
    contentType.fields = [];
    for (const obj in this.fieldFormItems.value) {
      if (Object.prototype.hasOwnProperty.call(this.fieldFormItems.value, obj)) {
        contentType.fields.push(this.fieldFormItems.value[obj].contentField);
      }
    }
    
    let saveObservable: Observable<ContentType | Observable<never>>;
      if (contentType.id) {
        saveObservable = this.service.update(contentType);
      } else {
        saveObservable = this.service.create(contentType);
      }
      saveObservable.subscribe(data => {
        console.log('saved content-type:', data);
        this.rForm.patchValue(data);
      }, err => {
        if (err.statusText === 'Conflict') {
          this.messageEmitter.emit({msg: 'The template name must be unique', code: 409, err});
        } else {
          this.messageEmitter.emit({msg: 'Something went wrong', code: 500, err});
        }
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
    console.log('loading item:', id);
    if (id) {
      this.service.get(id).subscribe((response: ContentType) => {
        this.rForm.patchValue(response);
        this.rForm.patchValue({'new': false});
        this.setContentFields(response.fields);
      });
    }
  }

  setContentFields(contentFields: ContentField[]) {
    this.fieldFormItems.clear();
    contentFields.map(contentField => {
      this.addField(contentField);
    });
  }

  get contentType(): ContentType {
    return Object.assign(new ContentType(), this.rForm.value);
  }

  get fieldFormItems(): FormArray {
    return this.rForm.get('fieldFormItems') as FormArray;
  }

  addField(contentField?: ContentField): void {
    if (!contentField) {
      contentField = new ContentField();
      contentField.name = uuid();
      contentField.displayName = 'Body field';
      contentField.fieldType = 'text';
      contentField.required = false;
      contentField.sortOrder = 0;
    }
    const fieldGroup = this.fb.group({'contentField': this.fb.control(contentField)});
    this.fieldFormItems.push(fieldGroup);
  }

  cleanFieldName(field: ContentField): string {
    const name = field.displayName ? field.displayName.toLowerCase().replace(/[^\w]/g, '') : '';
    return name + '_' + field.fieldType;
  }

  removeFieldControl(index: number): void {
    console.log('removing control:', index);
    this.fieldFormItems.removeAt(index);
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
    private service: ContentTypesService) {

    this.service.getFieldTypes().subscribe((fieldTypes: any[]) => {
      this.fieldTypes = fieldTypes;
    }, (err) => { console.log('failed to retrieve Field Types'); } );

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyContentType', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new content type =]'],
      'requiresTemplate': [false],
      'fieldFormItems': fb.array([]),
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
