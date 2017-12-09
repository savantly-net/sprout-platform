import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {

  _hideToolbar = new BehaviorSubject<boolean>(false);

  getHideToolbar() {
    return this._hideToolbar.asObservable();
  }

  setHideToolbar (val: boolean) {
    this._hideToolbar.next(val);
  }

  constructor() { }

}
