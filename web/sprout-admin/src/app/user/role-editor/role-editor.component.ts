import { PrivilegeService, Privilege } from '../privilege.service';
import { Role, RoleService } from '../role.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit {

  role: Role;
  privileges: Privilege[];
  selectedPrivileges: any = {};

  isSelectedPrivilege(item: Privilege) {
    this.role.privileges.forEach(p => {
      if (p.id === item.id) {
        return true;
      }
    });
    return false;
  }

  addSelectedPrivileges() {
    this.privileges.forEach(p => {
      this.role.privileges.forEach(rp => {
        if (p.id === rp.id) {
          this.selectedPrivileges[p._links.self.href] = true;
        }
      });
    });
  }

  loadItem(id: string) {
    this.roleService.findOne(id + '?projection=defaultRoleProjection').subscribe(response => {
      this.role = response;
      this.addSelectedPrivileges();
    }, err => {
      this.snackBar.open('Failed to retrieve Role', 'Close', {duration: 4000});
    });
  }

  save(): void {
    const keys = Object.keys(this.selectedPrivileges);
    const privs = [];
    keys.forEach(p => {
      if (this.selectedPrivileges[p]) {
        privs.push(p);
      }
    });
    this.roleService.putPrivileges(this.role, privs).subscribe(response => {
      this.snackBar.open('Saved', 'Close', {duration: 4000});
    }, err => {
      console.error(err);
      this.snackBar.open('Failed to save', 'Close', {duration: 4000});
    });
  }

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private roleService: RoleService,
    private privilegeService: PrivilegeService) { }

  ngOnInit() {
    this.privilegeService.findAll().subscribe(response => {
      this.privileges = response._embedded.privileges;
      this.route.params.subscribe( params => this.loadItem(params['id']) );
    }, err => {
      console.log(err);
      this.snackBar.open('Failed to retrieve id parameter from address bar', 'Close', {duration: 4000});
    });
  }

}
