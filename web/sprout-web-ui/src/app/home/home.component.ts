import { PageService } from '../page/page.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  _page: BehaviorSubject<string> = new BehaviorSubject<string>('');
  page: Observable<string> = this._page.asObservable();

  constructor(private pageService: PageService) {
    this.pageService.getHomePage().subscribe(function(page){
      this._page.next(page);
    });
  }

  ngOnInit() {
    console.log('Hello Home');
  }
}
