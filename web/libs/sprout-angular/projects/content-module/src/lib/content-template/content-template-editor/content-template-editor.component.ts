import { ContentTypesService } from '../../content-types/content-types.service';
import { ContentTemplate, ContentTemplateService } from '../content-template.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-template-editor',
  templateUrl: './content-template-editor.component.html',
  styleUrls: ['./content-template-editor.component.css']
})
export class ContentTemplateEditorComponent implements OnInit {
  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();

  rForm: FormGroup;
  content: string;

  save(model: ContentTemplate) {
    model.content = this.content;
    this.service.create(model).subscribe(data => {
      this.router.navigate(['content-template-editor', {id: (data as unknown as ContentTemplate).id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.messageEmitter.emit({msg: 'The template name must be unique', code: 400, err});
      }
    });
  }

  delete(model: ContentTemplate) {
    this.service.delete(model).subscribe(data => {
      this.router.navigate(['content-template']);
    }, err => {
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findById(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
        this.content = response.content;
      });
    }
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ContentTemplateService) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['MyTemplate', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A new template =]'],
      'new': [true],
      'createdDate': [null],
      'createdBy': [null],
      'modifiedDate': [null],
      'modifiedBy': [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.loadItem(params['id']) );
  }

}
