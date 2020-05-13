import { Component, OnInit } from '@angular/core';
import { Tenant, TenantService } from '../tenant.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {

  items: Tenant[];

  addItem(): void {
    this.router.navigate(['tenant-editor']);
  }

  editItem(item: Tenant): void {
    this.router.navigate(['tenant-editor', {id: item.id}]);
  }

  deleteItem(item: Tenant): void {
    this.service.deleteItem(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.snackBar.open('Could not delete item', 'Close', {duration: 8000});
      console.error(err);
    });
  }


  getItems(): void {
    this.service.findAll().subscribe(data => {
      this.items = data._embedded.tenants;
    }, err => {
      console.error('Failed to get tenants');
    });
  }

  constructor(private router: Router, private service: TenantService, private snackBar: MatSnackBar) {
    this.getItems();
  }

  ngOnInit() {
  }

}
