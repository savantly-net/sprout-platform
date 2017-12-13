import { ServerPluginsService } from './server-plugins.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-server-plugins',
  templateUrl: './server-plugins.component.html',
  styleUrls: ['./server-plugins.component.css']
})
export class ServerPluginsComponent implements OnInit {

  constructor(
    private pluginService: ServerPluginsService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe( (params) => {
      if (params['id']) {
        console.log(params['id']);
        this.pluginService.renderPlugin(params['id']).subscribe(response => {
          console.log(response);
        });
      }
    });
  }

}
