import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';

@Component({
  selector: 'my-sprout-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: []
})
export class WikiComponent implements OnInit {
  @ViewChildren(MdMenuTrigger) triggers: QueryList<MdMenuTrigger>;

  constructor() {
  }

  ngOnInit() {
  }

}
