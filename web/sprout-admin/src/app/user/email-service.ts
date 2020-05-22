import { RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class EmailAddress extends HalResponse {
  emailAddress: string;
  verified: boolean;
}

@Injectable()
export class EmailService extends RestRepositoryService<EmailAddress> {

  constructor(http: HttpClient) {
    super(http, '/api/repo/emailAddresses');
  }

}
