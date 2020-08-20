import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractNgModelComponent } from '../../standard';
import { ContentTemplate, ContentTemplateService } from '../content-template.service';

@Component({
  selector: 'sprout-content-template-editor',
  templateUrl: './content-template-editor.component.html',
  styleUrls: ['./content-template-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentTemplateEditorComponent),
      multi: true
    }
  ]
})
export class ContentTemplateEditorComponent extends AbstractNgModelComponent<ContentTemplate> implements OnInit {
  @Input('hideHeader') hideHeader: boolean;
  @Input('hideFooter') hideFooter: boolean;
  @Input('hideName') hideName: boolean;
  @Input('hideDescription') hideDescription: boolean;

  /** Provide an interception before the save is executed. Return true if already handled */
  @Input('beforeSave') beforeSave: (model: ContentTemplate) => boolean = (model: ContentTemplate) => {
    return false;
  }

  @Input('afterSave') afterSave: (model: ContentTemplate) => void = (model: ContentTemplate) => {
    this.router.navigate(['content-template', model.id, 'edit']);
  }

  /** Provide an interception before the close is executed. Return true if already handled */
  @Input('beforeClose') beforeClose: (model: ContentTemplate) => boolean = (model: ContentTemplate) => {
    return false;
  }

  /** Provide an interception before the delete is executed. Return true if already handled */
  @Input('beforeDelete') beforeDelete: (model: ContentTemplate) => boolean = (model: ContentTemplate) => {
    return false;
  }

  /** Provide an interception after the delete is executed. Return true if already handled */
  @Input('afterDelete') afterDelete: (model: ContentTemplate) => void = (model: ContentTemplate) => {
    this.router.navigate(['content-template']);
  }

  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();

  rForm: FormGroup;

  close(){
    if(this.beforeClose(this.rForm.value)){ return; }
    this.router.navigate(['content-template']);
  }

  save() {
    if(this.beforeSave(this.value)) { return; }
    let observableSave: Observable<ContentTemplate | Observable<never>>;
    if(this.value.id) {
      observableSave = this.service.update(this.value);
    } else {
      observableSave = this.service.create(this.value);
    }
    observableSave.subscribe(data => {
      this.afterSave(data as ContentTemplate)
    }, err => {
      this.messageEmitter.emit({msg: 'There was an error while saving', code: 400, err});
    });
  }

  delete() {
    if(this.beforeDelete(this.value)) { return; }
    if(confirm('Are you sure?')) {
      this.service.delete(this.value).subscribe(data => {
        this.afterDelete(this.value);
      }, err => {
        console.error(err);
      });
    }
  }

  loadItem() {
    this.rForm.patchValue(this.value);
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ContentTemplateService,
    injector: Injector) {
      super(injector);
    this.rForm = fb.group({
      'id' : [null],
      'name' : ['MyTemplate', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new template =]'],
      'content': [null],
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null]
    });
    this.rForm.valueChanges.subscribe(change => {
      this.notifyValueChange();
      Object.assign(this.value, change);
    })
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contentTemplate }) => {
      if(contentTemplate){
        this.value = contentTemplate;
      }
      this.loadItem();
    });
  }

}
