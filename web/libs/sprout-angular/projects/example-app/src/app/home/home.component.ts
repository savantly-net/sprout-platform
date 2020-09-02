import { Component, OnInit } from '@angular/core';
import { ExternalConfigurationService } from '../../environments/external-configuration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string;
  password: string;

  login(){
    this.http.post('http://localhost:8080/api/login', {username: this.username, password: this.password})
      .subscribe(res => {
        console.log(res);
      })
  }

  constructor(protected http: HttpClient) { }

  ngOnInit(): void {
  }

}
