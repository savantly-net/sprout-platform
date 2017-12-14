import { DynamicBuilderService } from '../dynamic/dynamic-builder.service';
import { ServerPluginsService } from './server-plugins.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-server-plugins',
  templateUrl: './server-plugins.component.html',
  styleUrls: ['./server-plugins.component.css']
})
export class ServerPluginsComponent implements OnInit {

  loading = true;

  @ViewChild('dynamic', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef

  constructor(
    private pluginService: ServerPluginsService,
    private route: ActivatedRoute,
    private dynamicBuilder: DynamicBuilderService) { }

  ngOnInit() {

    this.route.params.subscribe( (params) => {
      if (params['id']) {
        this.pluginService.plugins.subscribe(plugins => {
          let plugin = plugins[params['id']];
          console.log('trying to render plugin: ', plugin);
          this.pluginService.renderPlugin(plugin).subscribe(response => {
            this.dynamicBuilder.createComponent(response, this.viewContainerRef);
            this.loading = false;
          }, (error) => {
            this.dynamicBuilder.createComponent(JSON.stringify(error), this.viewContainerRef);
            this.loading = false;
          });
        });
      }
    });
  }

}
