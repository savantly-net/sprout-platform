import { Identifiable } from '../../spring-data/rest-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Tenant, TenantService } from '../tenant.service';

@Component({
  selector: 'app-tenant-editor',
  templateUrl: './tenant-editor.component.html',
  styleUrls: ['./tenant-editor.component.css']
})
export class TenantEditorComponent implements OnInit {

  rForm: FormGroup;

  showError(err) {
    if (err.statusText) {
      this.snackBar.open(err.statusText, 'Close', {duration: 8000});
    }
  }

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      this.service.provision(data.id).subscribe(provisioningResponse => {
        this.snackBar.open('Saved and provisioned', 'Close', {duration: 8000});
        this.router.navigate(['tenant-editor', {id: data.id}]);
      }), err => this.showError;
    }, err => this.showError);
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['tenants']);
    }, err => {
      this.snackBar.open('Error while deleting the item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
        this.aliases.setValue([]);
        response.aliases.map(a => {
          this.addAlias(a);
        });
      });
    }
  }

  get aliases(): FormArray {
    return this.rForm.get('aliases') as FormArray;
  }

  addAlias(a?: string): void {
    const aliasControl = this.fb.control(a);
    this.aliases.push(aliasControl);
  }

  removeAliasControl(index: number): void {
    this.aliases.removeAt(index);
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
    private service: TenantService) {

    this.rForm = fb.group({
      'id' : ['TENANT_X', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'description': ['For tenant X'],
      'aliases': fb.array([]),
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
