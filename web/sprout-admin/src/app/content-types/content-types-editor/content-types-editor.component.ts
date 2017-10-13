import { ContentTemplate, ContentTemplateService } from '../../content-template/content-template.service';
import { ContentTypesService, ContentType } from '../content-types.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-content-types-editor',
  templateUrl: './content-types-editor.component.html',
  styleUrls: ['./content-types-editor.component.css']
})
export class ContentTypesEditorComponent implements OnInit {

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

  save(model) {
    this.service.saveItem(model).subscribe(data => {
      this.router.navigate(['content-types-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The template name must be unique', 'Close', {duration: 8000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['content-types']);
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
    private service: ContentTypesService,
    private contentTemplateService: ContentTemplateService) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyContentType', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new content type =]'],
      'template': [null],
      'fields': [[{name: 'testField'}]],
      'new': [true],
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.loadItem(params['id']) );
    this.getContentTemplates();
  }

}
