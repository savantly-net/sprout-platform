import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractNgModelComponent } from "@savantly/ngx-sprout-core";
import { SproutUser, SproutUserService } from '../sprout-user.service';
import { Observable, isObservable } from 'rxjs';

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
export class SproutUserEditorComponent extends AbstractNgModelComponent<SproutUser> {

  @Input('hideHeader') hideHeader: boolean = false;
  @Input('hideFooter') hideFooter: boolean = false;


  /** Provide an interception before the save is executed. Return true if already handled */
  @Input('beforeSave') beforeSave: (model: SproutUser) => boolean = (model: SproutUser) => {
    return false;
  }

  @Input('afterSave') afterSave: (model: SproutUser) => void = (model: SproutUser) => {
    this.router.navigate(['content-item', model.id, 'edit']);
  }

  /** Provide an interception before the close is executed. Return true if already handled */
  @Input('beforeClose') beforeClose: (model: SproutUser) => boolean = (model: SproutUser) => {
    return false;
  }

  /** Provide an interception before the delete is executed. Return true if already handled */
  @Input('beforeDelete') beforeDelete: (model: SproutUser) => boolean = (model: SproutUser) => {
    return false;
  }
  /** Provide an interception after the delete is executed. Return true if already handled */
  @Input('afterDelete') afterDelete: (model: SproutUser) => boolean = (model: SproutUser) => {
    return false;
  }

  delete(user: SproutUser) {
    alert('not implemented yet');
  }

  close() {
    alert('not implemented yet');
  }

  save(){
    if(!this.beforeSave(this._value)){
      let userSave: Observable<SproutUser | Observable<never>>;
      if(this._value.id) {
        userSave = this.userService.update(this._value);
      } else {
        userSave = this.userService.create(this._value);
      }
      userSave.subscribe(res => {
        if(isObservable(res)){
          console.error(res);
        } else {
          this.afterSave(this._value);
        }
      })
    }
  }

  constructor(
    protected userService: SproutUserService,
    protected router: Router,
    injector: Injector) {
      super(injector);
  }
}
