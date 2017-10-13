import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentItemService } from '../content-item.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-content-item-editor',
  templateUrl: './content-item-editor.component.html',
  styleUrls: ['./content-item-editor.component.css']
})
export class ContentItemEditorComponent implements OnInit {

  rForm: FormGroup;
  _templates: BehaviorSubject<ContentTemplate[]> = new BehaviorSubject<ContentTemplate[]>([]);
  templates: Observable<ContentTemplate[]> = this._templates.asObservable();

  getContentTemplates(): void {
    this.contentTemplateService.findAll().subscribe(data => {
      console.log(data);
      this._templates.next(data._embedded.contentTemplates);
    }, err => {
      console.error('Failed to get contentTemplates');
    });
  }

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    halModel.template = model.template._links.self.href;
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      this.router.navigate(['content-item-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The item name must be unique', 'Close', {duration: 8000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['content-item']);
    }, err => {
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
      });
    }
  }

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private contentTemplateService: ContentTemplateService,
    private service: ContentItemService) {
    this.rForm = fb.group({
      'id' : [''],
      'name' : ['My Cool Content Item', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new content type =]'],
      'template': [null],
      'fieldValues': [null],
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
    this.getContentTemplates();
  }

}
