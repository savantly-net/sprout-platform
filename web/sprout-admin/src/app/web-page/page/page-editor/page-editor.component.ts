import { ContentItem, ContentItemService } from '../../../content-item/content-item.service';
import { Identifiable } from '../../../spring-data/rest-repository.service';
import { Layout, LayoutService } from '../../layout/layout.service';
import { PageService } from '../page.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-page-editory',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {
  layouts: Layout[];
  allContentItems: ContentItem[];
  rForm: FormGroup;

  formDefinition = {
    'id' : [''],
    'name' : ['My new page', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
    'description': ['A page'],
    'contentItems': this.fb.array([]),
    'webPageLayout': [null],
    'new': [true],
    'createdDate': [null],
    'createdBy': [null],
    'modifiedDate': [null],
    'modifiedBy': [null],
    '_links': [null],
    '_embedded': [null]
  };

  prepareSave(model): any {
    const halModel = Object.assign({}, model);
    halModel.contentItems = {};
    halModel.webPageLayout = model.webPageLayout._links.self.href;
    model.contentItems.map(item => {
      if (item.value !== null) {
       halModel.contentItems[item.key] = item.value;
      }
    });
    console.log('halModel:', halModel);
    return halModel;
  }

  save(model) {
    const halModel = this.prepareSave(model);
    this.service.saveItem(halModel).subscribe(data => {
      this.router.navigate(['page-editor', {id: data.id}]);
    }, err => {
      if (err.statusText === 'Conflict') {
        this.snackBar.open('The name must be unique', 'Close', {duration: 8000});
      }
    });
  }

  delete(model) {
    this.service.deleteItem(model).subscribe(data => {
      this.router.navigate(['pages']);
    }, err => {
      this.snackBar.open('Error while deleting the item', 'Close', {duration: 8000});
      console.error(err);
    });
  }

  loadItem(id?: string) {
    if (id) {
      const fDefinition = Object.assign({}, this.formDefinition);
      this.service.findOne(id).subscribe((page: any) => {
        this.service.getWebPageLayout(page).subscribe(webPageLayout => {
          page.webPageLayout = webPageLayout;
          webPageLayout.placeHolders.map(key => {
            fDefinition.contentItems.push(this.fb.group({key: key, value: page.contentItems[key]}));
          });
        delete page.contentItems;
        this.rForm = this.fb.group(fDefinition);
        this.rForm.patchValue(page);
        });
      });
    } else {
      this.rForm = this.fb.group(this.formDefinition);
    }
  }

  get selectedWebPageLayout(): FormControl {
    return <FormControl>this.rForm.get('webPageLayout');
  }

  get contentItems(): FormArray {
    return this.rForm.get('contentItems') as FormArray;
  }

  addContentItem(item: {key: string, value: ContentItem} ): void {
    const itemControl = this.fb.group({'key': item.key, 'value': [item.value]});
    this.contentItems.push(itemControl);
  }

  removeContentItem(index: number): void {
     this.contentItems.removeAt(index);
  }

  trackById(index: number, item: Identifiable) {
    if (item == null) { return null; } else {
      return item.id;
    }
  }

  idCompare(o1: any, o2: any) {
    if (o1 == null || o2 == null) {
      return false;
    } else {
      return o1.id === o2.id;
    }
  }
  trackByKey(index: number, item: {key: string}) {
    return item.key;
  }

  keyCompare(o1: any, o2: any) {
    return o1.key === o2.key;
  }

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: PageService,
    private layoutService: LayoutService,
    private contentItemService: ContentItemService) {

    layoutService.findAll().subscribe(response => {
      this.layouts = response._embedded.webPageLayouts;
    }, err => {
      snackBar.open('Could not retrieve Page Layouts');
      console.error(err);
    } );

    contentItemService.findAll().subscribe(contentItemsResponse => {
      this.allContentItems = contentItemsResponse._embedded.contentItems;
    }, err => {
      this.snackBar.open('Could not retrieve All Content Items');
      console.error(err);
    });


  }

  ngOnInit() {
    this.route.params.subscribe( params => this.loadItem(params['id']) );
  }
}
