import { ContentItemService, ContentItem } from '../content-item.service';
import { Component, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

class ContentItemBrowserDialogResult {
  cancelled = true;
  value: any;
}

@Component({
  selector: 'sprout-content-item-browser-dialog',
  templateUrl: './content-item-browser-dialog.component.html',
  styleUrls: ['./content-item-browser-dialog.component.css']
})
export class ContentItemBrowserDialogContent{
  @Input() filterText: string;
  @Input() items: ContentItem[];
  result: ContentItemBrowserDialogResult = new ContentItemBrowserDialogResult();

  select(item: ContentItem) {
    this.result.cancelled = false;
    this.result.value = item;
    this.activeModal.close(this.result);
  }

  constructor(service: ContentItemService, public activeModal: NgbActiveModal) {
      service.getAll().subscribe((response) => {
        this.items = response;
      });
    }
}

@Component({
  selector: 'sprout-content-item-browser-dialog-component',
  template: `<p>empty</p>`
})
export class ContentItemBrowserDialogComponent {
  result: ContentItemBrowserDialogResult;

  constructor(
    private modalService: NgbModal) {
    
  }
  open() {
    const modalRef = this.modalService.open(ContentItemBrowserDialogContent)
      .result.then((result) => {
      this.result = result;
    }, (reason: ModalDismissReasons) => {
      // do something?
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
