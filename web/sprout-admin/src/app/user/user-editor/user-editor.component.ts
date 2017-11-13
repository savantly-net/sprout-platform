import { Identifiable } from '../../spring-data/rest-repository.service';
import { EmailService, EmailAddress } from '../email-service';
import { UserService, User } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

  rForm: FormGroup;

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    halModel.primaryEmailAddress = { emailAddress: model.primaryEmailAddress },
    console.log('halModel:', halModel);
    return halModel;
  }

  saveEmailAddress(model): Promise<User> {
    const emailPromise = new Promise((resolve, reject) => {
      this.emailService.findOne(model.primaryEmailAddress.emailAddress).subscribe(emailAddressResponse => {
        model.primaryEmailAddress = emailAddressResponse._links.self.href;
        resolve(model);
      }, findErr => {
        console.log('saving new email address: {}', model.primaryEmailAddress.emailAddress);
        this.emailService.saveItem(model.primaryEmailAddress).subscribe((savedEmailAddress) => {
          model.primaryEmailAddress = savedEmailAddress._links.self.href;
          resolve(model);
        }, saveErr => {
          reject(saveErr);
        });
      });
    });
    return emailPromise;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.saveEmailAddress(halModel).then(userResponse => {
      this.service.saveItem(halModel).subscribe(data => {
        this.router.navigate(['user-editor', {id: data.id}]);
        this.snackBar.open('Saved', 'Close', {duration: 8000});
      }, err => {
        if (err.statusText === 'Conflict') {
          this.snackBar.open('Failure to save the item', 'Close', {duration: 8000});
        }
      });
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['users']);
    }, err => {
      this.snackBar.open('Error while deleting the item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  loadItem(id: string) {
    if (id) {
      this.service.findOne(id).subscribe((response: any) => {
        this.rForm.patchValue(response);
        this.loadPrimaryEmailAddress(response);
      }, err => {
        console.error('Error while loading item with id: {}', id);
      });
    }
  }

  loadPrimaryEmailAddress(userModel) {
    this.httpClient.get(userModel._links.primaryEmailAddress.href).subscribe(emailAddressResponse => {
      this.rForm.controls['primaryEmailAddress'].setValue((<any>emailAddressResponse).emailAddress);
    });
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
    private service: UserService,
    private emailService: EmailService,
    private httpClient: HttpClient) {

    this.rForm = fb.group({
      'id' : [''],
      'username' : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'displayName': [''],
      'firstName': [''],
      'lastName': [''],
      'primaryEmailAddress': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'clearTextPassword': [''],
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
