import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, forwardRef, Injector, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentField } from '../../content-field/content-field.service';
import { AbstractNgModelComponent, uuid } from '../../standard';
import { ContentType, ContentTypesService } from '../content-types.service';

@Directive({
  selector: "[sproutContentTypeEditorBodyField]"
})
export class ContentTypeEditorBodyField {
  constructor(public template: TemplateRef<any>) {}
}

const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ContentTypesEditorComponent),
  multi: true
};

@Component({
  selector: 'sprout-content-type-editor',
  templateUrl: './content-types-editor.component.html',
  styleUrls: ['./content-types-editor.component.css'],
  providers: [DEFAULT_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ContentTypesEditorComponent extends AbstractNgModelComponent<ContentType> implements OnInit, AfterViewInit, AfterContentInit {

  @ContentChildren(ContentTypeEditorBodyField) bodyFields!: QueryList<ContentTypeEditorBodyField>;

  @Input('hideHeader') hideHeader: boolean;
  @Input('hideFooter') hideFooter: boolean;
  @Input('hideName') hideName: boolean;
  @Input('hideDescription') hideDescription: boolean;
  @Input('hideTemplate') hideTemplate: boolean = true;

  /** Provide an interception before the save is executed. Return true if already handled */
  @Input('beforeSave') beforeSave: (model: ContentType) => boolean = (model: ContentType) => {
    return false;
  }

  @Input('afterSave') afterSave: (model: ContentType) => void = (model: ContentType) => {
    this.router.navigate(['content-type', model.id, 'edit']);
  }

  /** Provide an interception before the close is executed. Return true if already handled */
  @Input('beforeClose') beforeClose: (model: ContentType) => boolean = (model: ContentType) => {
    return false;
  }

  /** Provide an interception before the delete is executed. Return true if already handled */
  @Input('beforeDelete') beforeDelete: (model: ContentType) => boolean = (model: ContentType) => {
    return false;
  }
  /** Provide an interception after the delete is executed. Return true if already handled */
  @Input('afterDelete') afterDelete: (model: ContentType) => boolean = (model: ContentType) => {
    return false;
  }
  
  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();

  @Input()
  set value(value: ContentType) {
    this._value = value;
    console.log('loading item from value: ', value)
    this.loadValue()
    this.notifyValueChange();
  }
  get value(){
    return this._value;
  }

  fieldTypes: any[];
  rForm: FormGroup;
  _initialFields: ContentField[] = [];
  _isLoading: boolean = false;

  save() {
    if(!this.beforeSave(this._value)){
      const contentType = Object.assign({}, this._value);
    
      let saveObservable: Observable<ContentType | Observable<never>>;
        if (contentType.id) {
          saveObservable = this.service.update(contentType);
        } else {
          saveObservable = this.service.create(contentType);
        }
        saveObservable.subscribe(data => {
          console.log('saved content-type:', data);
          this.rForm.patchValue(data);
          this.afterSave(data as ContentType);
        }, err => {
          if (err.statusText === 'Conflict') {
            this.messageEmitter.emit({msg: 'The template name must be unique', code: 409, err});
          } else {
            this.messageEmitter.emit({msg: 'Something went wrong', code: 500, err});
          }
        });
    }
  }

  close() {
    if(this.beforeClose(this._value)){
      return;
    }
    this.router.navigate(['content-type']);
  }

  delete(model: ContentType) {
    if(this.beforeDelete(model)) {
      return;
    }
    if(confirm('Are you sure')) {
      this.service.delete(model).subscribe(data => {
        if(this.afterDelete(model)) {
          return;
        }
        this.close();
      }, err => {
        this.messageEmitter.emit({msg: 'Error while deleting the item', code: 500, err});
        console.error(err);
      });
    }
  }

  loadValue() {
    if (this._value) {
      this._isLoading = true;
      this._initialFields = this._value.fields;
      this.patchValue(this._value);
      this.setContentFields(this._initialFields);
      this._isLoading = false;
      this.updateValueWithFormModel(this.rForm.value);
    }
  }

  patchValue(val: ContentType){
    this.rForm.patchValue(val);
    this.rForm.patchValue({'new': false});
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
      contentField.fieldType = 'TEXT';
      contentField.required = false;
      contentField.sortOrder = 0;
    }
    const fieldGroup = this.fb.group({'contentField': this.fb.control(contentField)});
    this.fieldFormItems.push(fieldGroup);
    this.notifyValueChange();
  }

  cleanFieldName(field: ContentField): string {
    const name = field.displayName ? field.displayName.toLowerCase().replace(/[^\w]/g, '') : '';
    return name + '_' + field.fieldType;
  }

  removeFieldControl(index: number): void {
    this.fieldFormItems.removeAt(index);
  }

  trackById(index: number, item: {id: string}) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  updateValueWithFormModel(val) {
    if(!this._isLoading) {
      Object.assign(this._value, val);
      this._value.fields = [];
      for (const obj in this.fieldFormItems.value) {
        if (Object.prototype.hasOwnProperty.call(this.fieldFormItems.value, obj)) {
          this._value.fields.push(this.fieldFormItems.value[obj].contentField);
        }
      }
      this.notifyValueChange();
    }
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ContentTypesService,
    injector: Injector) {

    super(injector);

    this.service.getFieldTypes().subscribe((fieldTypes: any[]) => {
      this.fieldTypes = fieldTypes;
    }, (err) => { console.log('failed to retrieve Field Types'); } );

    this.rForm = fb.group({
      'id' : [null],
      'name' : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': [''],
      'requiresTemplate': [false],
      'fieldFormItems': fb.array([]),
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null],
      '_links': [null],
      '_embedded': [null]
    });

    this.rForm.valueChanges.subscribe(change => {
      this.updateValueWithFormModel(change);
    })
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contentType }) => {
      if(contentType){
        // trigger the load because of value setter
        this.value = contentType;
        console.log('loaded item from route: ', contentType)
      }
    });
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit(){
  }
}
