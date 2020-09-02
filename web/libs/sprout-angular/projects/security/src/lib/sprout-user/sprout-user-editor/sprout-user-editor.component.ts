import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractNgModelComponent } from "@savantly/ngx-sprout-core";
import { SproutUserService } from '../sprout-user.service';
import { Observable, isObservable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResource } from '../sprout-user.resource';
import { RoleResource } from '../../sprout-role/sprout-role.resource';
import { SproutRoleService } from '../../sprout-role';

@Component({
  selector: 'sprout-user-editor',
  templateUrl: './sprout-user-editor.component.html',
  styleUrls: ['./sprout-user-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SproutUserEditorComponent),
      multi: true
    }
  ]
})
export class SproutUserEditorComponent extends AbstractNgModelComponent<UserResource> implements OnInit {

  roles?: RoleResource[];
  primaryRole?: RoleResource;

  @Input('hideHeader') hideHeader: boolean = false;
  @Input('hideFooter') hideFooter: boolean = false;


  /** Provide an interception before the save is executed. Return true if already handled */
  @Input('beforeSave') beforeSave: (model: UserResource) => boolean = (model: UserResource) => {
    return false;
  }

  @Input('afterSave') afterSave: (model: UserResource) => void = (model: UserResource) => {}

  /** Provide an interception before the close is executed. Return true if already handled */
  @Input('beforeClose') beforeClose: (model: UserResource) => boolean = (model: UserResource) => {
    return false;
  }

  /** Provide an interception before the delete is executed. Return true if already handled */
  @Input('beforeDelete') beforeDelete: (model: UserResource) => boolean = (model: UserResource) => {
    return false;
  }
  /** Provide an interception after the delete is executed. Return true if already handled */
  @Input('afterDelete') afterDelete: (model: UserResource) => boolean = (model: UserResource) => {
    return false;
  }

  delete(user: UserResource) {
    alert('not implemented yet');
  }

  close() {
    alert('not implemented yet');
  }

  save(){
    if(!this.beforeSave(this._value)){
      if(this.primaryRole) {
        this._value.roles = [];
        this._value.roles.push(this.primaryRole as RoleResource)
      }
      
      let userSave: Observable<UserResource | Observable<never>>;
      if(this._value.id) {
        userSave = this.userService.update(this._value);
      } else {
        userSave = this.userService.create(this._value);
      }
      userSave.subscribe(res => {
        if(isObservable(res)){
          console.error(res);
        } else {
          this.userService.patch(this._value).subscribe(patched => {
            this.afterSave(this._value);
          })
        }
      })
    }
  }

  ngOnInit(){
    this.roleService.getAll().subscribe(roles => {
      this.roles = roles;
    })
  }

  constructor(
    protected userService: SproutUserService,
    protected roleService: SproutRoleService,
    protected router: Router,
    injector: Injector) {
      super(injector);
  }
}
