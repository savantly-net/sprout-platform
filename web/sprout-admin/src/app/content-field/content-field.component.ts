import { ContentField } from '../content-field/content-field.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-field',
  templateUrl: './content-field.component.html',
  styleUrls: ['./content-field.component.css']
})
export class ContentFieldComponent implements OnInit {
  @Input() item: ContentField;

  constructor() { }

  ngOnInit() {
  }

}
