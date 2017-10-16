import { Identifiable } from '../../../spring-data/rest-repository.service';
import { LayoutService } from '../layout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css']
})
export class LayoutEditorComponent implements OnInit {

rForm: FormGroup;

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      this.router.navigate(['layout-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The template name must be unique', 'Close', {duration: 8000});
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
        this.rForm.patchValue(response);
      });
    }
  }

  get placeHolders(): FormArray {
    return this.rForm.get('placeHolders') as FormArray;
  }

  addPlaceHolder(value: string): void {
    const placeHolderControl = this.fb.control({value: value});
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
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: LayoutService) {

    this.rForm = fb.group({
      'id' : [''],
      'name' : ['My new layout', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['A layout'],
      'placeHolders': fb.array([]),
      'template': [''],
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
}
