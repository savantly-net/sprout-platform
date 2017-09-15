import { Component, OnInit } from '@angular/core';

export interface ContextMenuOption {
  text: string;
  action?: () => void;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'my-context-menu',
  templateUrl: './contextMenu.component.html',
  styleUrls: ['./contextMenu.component.css']
})
export class ContextMenuComponent implements OnInit {

  options: ContextMenuOption[] = [];
  constructor() {
  }

  ngOnInit() {
  }

  itemClicked(i: number) {
    if (this.options[i].action) {
      this.options[i].action();
    }
  }

}
