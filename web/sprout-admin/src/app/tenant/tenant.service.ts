import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';

export class Tenant extends HalResponse {
  aliases: string[]
}

@Injectable()
export class TenantService extends RestRepositoryService<Tenant> {

  provision(tenantId: string) {
    return this.http.post('/rest/provisioning/tenant/' + tenantId, null, {});
  }

  constructor(http: HttpClient) {
    super(http, '/api/tenants');
  }

}
