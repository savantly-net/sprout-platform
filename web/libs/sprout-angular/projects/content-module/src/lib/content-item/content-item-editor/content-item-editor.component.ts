import { Component, EventEmitter, forwardRef, Injector, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ContentField } from '../../content-field/content-field.service';
import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentType, ContentTypesService } from '../../content-types/content-types.service';
import { AbstractNgModelComponent } from '../../standard';
import { ContentItem, ContentItemService } from '../content-item.service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'sprout-content-item-editor',
  templateUrl: './content-item-editor.component.html',
  styleUrls: ['./content-item-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentItemEditorComponent),
      multi: true
    }
  ]
})
export class ContentItemEditorComponent extends AbstractNgModelComponent<ContentItem> implements OnInit {
  rForm: FormGroup;
  _initialized: boolean = false;
  differ: any;

  @Input('hideHeader') hideHeader: boolean;
  @Input('hideFooter') hideFooter: boolean;
  @Input('hideName') hideName: boolean;
  @Input('hideDescription') hideDescription: boolean;
  @Input('hideTemplate') hideTemplate: boolean;
  @Input('hideContentType') hideContentType: boolean;

  /** Provide an interception before the save is executed. Return true if already handled */
  @Input('beforeSave') beforeSave: (model: ContentItem) => boolean = (model: ContentItem) => {
    return false;
  }

  @Input('afterSave') afterSave: (model: ContentItem) => void = (model: ContentItem) => {
    this.router.navigate(['content-item', model.id, 'edit']);
  }

  /** Provide an interception before the close is executed. Return true if already handled */
  @Input('beforeClose') beforeClose: (model: ContentItem) => boolean = (model: ContentItem) => {
    return false;
  }

  /** Provide an interception before the delete is executed. Return true if already handled */
  @Input('beforeDelete') beforeDelete: (model: ContentItem) => boolean = (model: ContentItem) => {
    return false;
  }
  /** Provide an interception after the delete is executed. Return true if already handled */
  @Input('afterDelete') afterDelete: (model: ContentItem) => boolean = (model: ContentItem) => {
    return false;
  }

  @Output('contentItemChange')
  contentItemChange: EventEmitter<ContentItem> = new EventEmitter<ContentItem>();

  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();

  _templates: BehaviorSubject<ContentTemplate[]> = new BehaviorSubject<ContentTemplate[]>([]);
  templates: Promise<ContentTemplate[]> = this._templates.toPromise();
  contentTypes: BehaviorSubject<ContentType[]> = new BehaviorSubject<ContentType[]>([]);;

  getFieldValuesFromFieldControls(): any {
    const fieldValues = {};
    if(this.fieldsFormArray) {
      this.fieldsFormArray.controls.map(control => {
        fieldValues[control.value.id] = control.value.value;
      });
    }
    return fieldValues;
  }

  loadContentTemplates(): void {
    this.contentTemplateService.getAll().subscribe(data => {
      console.log(data);
      this._templates.next(data);
    }, err => {
      this.messageEmitter.emit({msg: 'The Content Templates could not be retrieved', code: 500, err});
      console.error('Failed to get contentTemplates');
    });
  }

  loadContentTypes(): void {
    this.contentTypeService.getAll().subscribe(data => {
      this.contentTypes.next(data);
    }, err => {
       this.messageEmitter.emit({msg: 'The Content Types could not be retrieved', code:500, err});
    });
  }

  loadContentItem() {
    const observableLoader: Observable<any>[] = [];
    if(this.value.hasContentType()) {
      observableLoader.push(this.value.getContentType());
    }
    if(this.value.hasContentTemplate()) {
      observableLoader.push(this.value.getContentTemplate())
    }
    forkJoin(observableLoader).subscribe(()=>{
      this.patchValues(this.value);
      this.applyFormFields();
      // Listen to form changes 
      console.log('subscribing to value changes');
      this.rForm.valueChanges.subscribe(change => {
        Object.assign(this.value, change);
        this.value.fieldValues = this.getFieldValuesFromFieldControls();
        this.contentItemChange.emit(this.value);
        return change;
      });
      this.currentContentType.valueChanges.subscribe((contentType: ContentType) => {
        setTimeout(()=>{
          this.applyFormFields();
        });
        
      });
    })
  }

  get fieldsFormArray(): FormArray {
    return this.rForm.get('fieldsFormArray') as FormArray;
  }

  get currentTemplate(): FormControl {
    return this.rForm.get('template') as FormControl;
  }

  get currentContentType(): FormControl {
    return this.rForm.get('contentType') as FormControl;
  }

  applyFormFields() {
    if(this.value.contentType){
      this.fieldsFormArray.clear();
      this.value.contentType.fields.forEach(item => {
        this.addFormFieldItem(item);
      });
    }
  }

  addFormFieldItem(contentField: ContentField){
    contentField['value'] = [this.value.fieldValues[contentField.id]];
    const formField = this.fb.control(contentField, {updateOn: "blur"});
    this.fieldsFormArray.push(formField);
  }

  patchValues(contentItem) {
    //const valueMap = Object.assign({}, contentItem.fieldValues);
    //delete contentItem.fieldValues;
    this.rForm.patchValue(contentItem);
    //this.currentContentType.patchValue(contentItem.contentType);
  }

  trackById(index: number, item: {id: any}) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1?.id === o2?.id;
  }
  
  save() {
    if(this.beforeSave(this.value)) {
      return;
    }
    const halModel = this.value;
    let saveObservable;
    if (halModel.id) {
      saveObservable = this.service.update(halModel);
    } else {
      saveObservable = this.service.create(halModel);
    }
    saveObservable.subscribe(data => {
      if (this.currentTemplate?.value?.id != null) {
        if (Object.getOwnPropertyNames(data).includes('subscribe')) {
          return;
        }
        this.service.setContentTemplate(data as unknown as ContentItem, this.currentTemplate.value).subscribe(contentItem => {
// need to do anything here?
        }, err => {
          console.error(err);
        });
      } else {
        this.afterSave(data as unknown as ContentItem);
      }
      this.messageEmitter.emit({msg: 'Saved', code: 200});
    }, err => {
      if (err.statusText === 'Conflict') {
        this.messageEmitter.emit({msg: 'The item name must be unique', code:409});
      } else {
        this.messageEmitter.emit({msg: 'failed', code: 500, err});
      }
    });
  }

  delete(model: ContentItem) {
    if(this.beforeDelete(model)) {
      if(confirm('Are you sure?')){
        this.service.delete(model).subscribe(data => {
          if(!this.afterDelete(model)){
            this.router.navigate(['content-item']);
          }
        }, err => {
          this.messageEmitter.emit({msg: 'Problem encountered while deleting', code: 500, err});
          console.error(err);
        });
      }
    }
  }

  close() {
    if(!this.beforeClose(this.value)){
      this.router.navigate(['content-item']);
    }
  }

  emptyFormDefinition = {
    'id' : [''],
    'name' : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
    'description': [''],
    'new': [true],
    'createdDate': [null],
    'createdBy': [null],
    'modifiedDate': [null],
    'modifiedBy': [null],
    'fieldsFormArray': this.fb.array([]),
    'contentType': [null]
  };

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private contentTemplateService: ContentTemplateService,
    private contentItemService: ContentItemService,
    private service: ContentItemService,
    private contentTypeService: ContentTypesService,
    keyDiffers: KeyValueDiffers,
    injector: Injector) {
      super(injector);
    
    this.differ = keyDiffers.find([]).create();
    this.loadContentTemplates();
    this.loadContentTypes();
    this.rForm = this.fb.group(this.emptyFormDefinition);
  }

  ngOnInit() {
    console.log('init');
    this.activatedRoute.data.subscribe(({ contentItem }) => {
      if(contentItem){
        this.value = contentItem;
      } 
      this.loadContentItem();
    });
  }
}
