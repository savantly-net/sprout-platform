import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() mode = 'indeterminate';

  constructor() { }

  ngOnInit() {
  }

}
