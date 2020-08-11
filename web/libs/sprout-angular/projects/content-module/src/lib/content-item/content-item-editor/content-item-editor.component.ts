import { ContentField } from '../../content-field/content-field.service';
import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentTypesService, ContentType } from '../../content-types/content-types.service';
import { ContentItemService, ContentItem } from '../content-item.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
//import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-content-item-editor',
  templateUrl: './content-item-editor.component.html',
  styleUrls: ['./content-item-editor.component.css']
})
export class ContentItemEditorComponent implements OnInit {
  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();

  rForm: FormGroup;
  _templates: BehaviorSubject<ContentTemplate[]> = new BehaviorSubject<ContentTemplate[]>([]);
  templates: Promise<ContentTemplate[]> = this._templates.toPromise();
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
        'requiresTemplate': [null],
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
    this.contentTemplateService.getAll().subscribe(data => {
      console.log(data);
      this._templates.next(data);
    }, err => {
      this.messageEmitter.emit({msg: 'The Content Templates could not be retrieved', code: 500, err});
      console.error('Failed to get contentTemplates');
    });
  }

  getContentTypes(): void {
    this.contentTypeService.getAll().subscribe(data => {
      this.contentTypes = data
    }, err => {
       this.messageEmitter.emit({msg: 'The Content Types could not be retrieved', code:500, err});
    });
  }

  prepareSave(model: ContentItem): any {
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
    this.service.create(halModel).subscribe(data => {
      if (this.currentTemplate.value.id != null) {
        if (Object.getOwnPropertyNames(data).includes('subscribe')) {
          return;
        }
        this.service.setContentTemplate(data as unknown as ContentItem, this.currentTemplate.value).subscribe(contentItem => {
// need to do anything here?
        }, err => {
          console.error(err);
        });
      } else {
        this.router.navigate(['content-item-editor', {id: (data as unknown as ContentItem).id}]);
      }
      this.messageEmitter.emit({msg: 'Saved', code: 200});
    }, err => {
      if (err.statusText === 'Conflict') {
        this.messageEmitter.emit({msg: 'The item name must be unique', code:400});
      } else {
        this.messageEmitter.emit({msg: 'failed', code: 500, err});
      }
    });
  }

  delete(model: ContentItem) {
    this.service.delete(model).subscribe(data => {
      this.router.navigate(['content-item']);
    }, err => {
      this.messageEmitter.emit({msg: 'Problem encountered while deleting', code: 500, err});
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      const searchOptions: any = {params: [{key: 'id', value: id}]};
      this.service.searchSingle('findById', searchOptions).subscribe((contentItem: any) => {
        this.service.getContentType(contentItem).subscribe((contentType: ContentType)=> {
          contentItem.contentType = contentType;
          this.getContentTypeFields(contentType, (contentFields) => {
            if (!contentType.requiresTemplate) {
              this.createFormFromExisting(contentItem, contentFields);
            } else {
              const obs = this.service.getContentTemplate(contentItem);
              obs.pipe((o: Observable<ContentTemplate>) => { 
                  this.createFormFromExisting(contentItem, contentFields); 
                  return o;
                })
                .subscribe(contentTemplate => {
                contentItem.template = contentTemplate;
              }, err => { this.messageEmitter.emit({msg: 'Please set Content Template', code: 400, err}); console.error(err); });
            }
          });
        }, err => {
          this.messageEmitter.emit({msg: 'Could not retrieve Content Type', code: 500, err});
          console.error(err);
        });
      }, err => {
        this.messageEmitter.emit({msg: 'Could not retrieve Content Item', code: 500, err});
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
    if(!this.rForm) return null;
    const ctrl = this.rForm.get('contentType') as FormControl;
    ctrl.disable();
    return ctrl;
  }

  getContentTypeFields(contentType: ContentType, callback): void {
    this.contentTypeService.findContentFields(contentType).subscribe(data => {
      const fields = data;
      callback(fields);
    }, err => {
      this.messageEmitter.emit({msg: 'Could not retrieve Content Type Fields', code: 500, err});
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

  trackById(index: number, item: {id: any}) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
