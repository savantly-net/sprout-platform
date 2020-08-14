import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ContentField } from '../../content-field/content-field.service';
import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentType, ContentTypesService } from '../../content-types/content-types.service';
import { ContentItem, ContentItemService } from '../content-item.service';
//import 'rxjs/add/operator/finally';

@Component({
  selector: 'sprout-content-item-editor-embedded',
  templateUrl: './content-item-editor-embedded.component.html',
  styleUrls: ['./content-item-editor-embedded.component.css']
})
export class ContentItemEditorEmbeddedComponent {
  rForm: FormGroup;
  _initialized: boolean = false;
  value: ContentItem;

  @Input('hideName') hideName: boolean;
  @Input('hideDescription') hideDescription: boolean;
  @Input('hideTemplate') hideTemplate: boolean;

  @Input('contentItem') 
  set contentItem(contentItem: ContentItem) {
    console.log('SETting contentItem in embedded editor');
    this.value = contentItem;
    if(!this._initialized){
      this.loadContentItem(contentItem);
    } else {
      this.patchValues(contentItem);
    }
  }
  get contentItem(){
    console.log('GETting contentItem in embedded editor');
    return this.value;
  }
  @Output('contentItemChange')
  contentItemChange: EventEmitter<ContentItem> = new EventEmitter<ContentItem>();

  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();

  _templates: BehaviorSubject<ContentTemplate[]> = new BehaviorSubject<ContentTemplate[]>([]);
  templates: Promise<ContentTemplate[]> = this._templates.toPromise();
  contentTypes: ContentType[];

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
      this.contentTypes = data
    }, err => {
       this.messageEmitter.emit({msg: 'The Content Types could not be retrieved', code:500, err});
    });
  }

  loadContentItem(contentItem: ContentItem) {
    if (contentItem) {
      if (contentItem.contentType) {
        contentItem.contentType.getContentFields().subscribe(contentFields => {
          this.createFormFromExisting(contentItem, contentFields);
        });
      } else {
        const msg = 'Embedded editor requires a contentType to be set';
        this.messageEmitter.emit({msg, code: 400});
        console.warn(msg);
      }
      
    } 
  }

  get fieldsFormArray(): FormArray {
    return this.rForm.get('fieldsFormArray') as FormArray;
  }

  get currentTemplate(): FormControl {
    return this.rForm.get('template') as FormControl;
  }

  createFormFromExisting(contentItem: ContentItem, contentFields: ContentField[]): void {
    const formDefinition = Object.assign({}, this.emptyFormDefinition);
    const formControls = contentFields.map(field => {
      field['value'] = [contentItem.fieldValues[field.id]];
      return this.fb.control(field, {updateOn: "blur"});
    });
    this.rForm = this.fb.group(formDefinition);
    this.rForm.addControl('fieldsFormArray', this.fb.array(formControls));
    this.patchValues(contentItem);

    // Listen to form changes 
    this.rForm.valueChanges.subscribe(change => {
      Object.assign(this.value, change);
      this.value.fieldValues = this.getFieldValuesFromFieldControls();
      this.contentItemChange.emit(this.value);
      return change;
    })

    this._initialized = true;

    
    this.fieldsFormArray.valueChanges.subscribe(change => {
      change.fieldValues = this.getFieldValuesFromFieldControls();
      this.contentItemChange.emit(change);
    })
    
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
    return o1.id === o2.id;
  }

  emptyFormDefinition = {
    'id' : [''],
    'name' : ['My Cool Content Item', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
    'description': ['A new piece of content'],
    'new': [true],
    'createdDate': [null],
    'createdBy': [null],
    'modifiedDate': [null],
    'modifiedBy': [null]
  };

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contentTemplateService: ContentTemplateService,
    private service: ContentItemService,
    private contentTypeService: ContentTypesService) {
    this.loadContentTemplates();
    this.loadContentTypes();
  }

  ngOnInit() {}
}
