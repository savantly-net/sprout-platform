import { Identifiable } from '../../../spring-data/rest-repository.service';
import { LayoutService } from '../layout.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CKEditorComponent } from 'ng2-ckeditor';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css']
})
export class LayoutEditorComponent implements OnInit, OnDestroy {
  @ViewChild('ckEditor') ckEditor: CKEditorComponent;
  rForm: FormGroup;
  template: BehaviorSubject<string> = new BehaviorSubject<string>('');

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    halModel.template = this.template.getValue();
    halModel.placeHolders = model.placeHolders.map(item => {
      return item.value;
    });
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      this.snackBar.open('Saved', 'Close', {duration: 4000});
      this.router.navigate(['layout-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The name must be unique', 'Close', {duration: 4000});
      } else {
        this.snackBar.open(err, 'Close', {duration: 4000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['layouts']);
    }, err => {
      this.snackBar.open('Error while deleting the item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.template.next(response.template || '');
        this.rForm.patchValue(response);
        response.placeHolders.map(placeHolder => {
          this.addPlaceHolder(placeHolder);
        });
      });
    }
  }

  get placeHolders(): FormArray {
    return this.rForm.get('placeHolders') as FormArray;
  }

  addPlaceHolder(value?: string): void {
    const placeHolderControl = this.fb.group({'value': [value]});
    this.placeHolders.push(placeHolderControl);
  }

  removePlaceHolderControl(index: number): void {
     this.placeHolders.removeAt(index);
  }

  trackById(index: number, item: Identifiable) {
    return item.id;
  }

  idCompare(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: LayoutService) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['My new layout', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A layout'],
      'placeHolders': fb.array([]),
      'showHeader': [true],
      'showFooter': [true],
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

  ngOnDestroy(): void { }
}
