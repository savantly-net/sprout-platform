import { ContentField, ContentFieldService } from '../../content-field/content-field.service';
import { ContentTypesService, ContentType } from '../content-types.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { findIdOfResourceSelfLink } from '../../standard/util/find-id-of-resource';

@Component({
  selector: 'app-content-types-editor',
  templateUrl: './content-types-editor.component.html',
  styleUrls: ['./content-types-editor.component.css']
})
export class ContentTypesEditorComponent implements OnInit {

  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();
  fieldTypes: any[];
  rForm: FormGroup;

  prepareSave(model: ContentType): any {
    const halModel = Object.assign({}, model);
    /*
    halModel.fields = [];
    if (model.fields) {
      model.fields.map(field => {
        console.log(field);
        halModel.fields.push(field._links.self.href);
      });
    }
    */
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model: ContentType) {
    const halModel = this.prepareSave(model);
    this.service.create(halModel).subscribe(data => {
      console.log('saved content-type:', data);
      this.messageEmitter.emit({msg: 'Saved', code: 200});
      const contentType = (data as unknown as ContentType);
      this.router.navigate(['content-type-editor', {name: contentType.name}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.messageEmitter.emit({msg: 'The template name must be unique', code: 400, err});
      }
    });
  }

  delete(model: ContentType) {
    this.service.delete(model).subscribe(data => {
      this.router.navigate(['content-types']);
    }, err => {
      this.messageEmitter.emit({msg: 'Error while deleting the item', code: 500, err});
      console.error(err);
    });
  }

  loadItem(name: string) {
    if (name) {
      this.service.findByName(name).subscribe((response: ContentType) => {
        this.rForm.patchValue(response);
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
      const fieldControlGroup = this.fb.group(contentField);
      this.listenToContentFieldChanges(fieldControlGroup);
      this.fields.push(fieldControlGroup);
    });
  }

  listenToContentFieldChanges(fieldControl: FormGroup) {
    const source = fieldControl.valueChanges;
    const valueChangesubscription = source.subscribe(value => {
      this.contentFieldService.create(fieldControl.value).subscribe(data => {
        this.messageEmitter.emit({msg: 'Auto-saved field properties', code: 200});
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
    this.contentFieldService.create(field).subscribe(data => {
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
      this.messageEmitter.emit({msg: 'Error while removing field', code: 500, err});
      console.error(err);
    });
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
