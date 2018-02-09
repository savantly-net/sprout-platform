import { DynamicBuilderService } from '../dynamic/dynamic-builder.service';
import { LoaderComponent } from '../dynamic/loader/loader.component';
import { ClientApiService, LoaderOptions } from './client-api.service';
import { Component, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'my-client-api',
  templateUrl: './client-api.component.html',
  styleUrls: ['./client-api.component.css']
})
export class ClientApiComponent implements AfterViewInit {

  fullScreenLoaderComponent: ComponentRef<LoaderComponent>;
  @ViewChild('dynamic', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef

  constructor(
    private sproutApi: ClientApiService,
    private snackBar: MatSnackBar,
    private dynamicBuilder: DynamicBuilderService) { }

  handleToast(options) {
    if (options) {
      if (typeof options === 'string') {
        this.snackBar.open(options, 'close');
      } else {
        this.snackBar.open(options);
      }
    }
  }

  showFullScreenLoader() {
    this.fullScreenLoaderComponent = this.dynamicBuilder.createLoaderComponent(this.viewContainerRef);
  }
  showLoader (options: LoaderOptions) {
    if (options == null) {
      return; // probably just initialized, so return silently
    }
    if (!options.key || options.fullScreen) {
        return this.showFullScreenLoader();
      }
      const defaultElement = document.querySelector('my-client-api');
      options.element = options.element || defaultElement;

      const imgWrapper = document.createElement('div');
      imgWrapper.setAttribute('id', options.key);
      imgWrapper.setAttribute('style', 'text-align:center;');

      const imgElement = document.createElement('img');
      imgElement.setAttribute('style', 'width:200px;');
      imgElement.setAttribute('src', './img/loader.svg');

      imgWrapper.appendChild(imgElement);
      options.element.appendChild(imgWrapper);
  };

  hideLoader (options: LoaderOptions) {
    if (options == null || !options.key || options.fullScreen) {
      if (this.fullScreenLoaderComponent) {
        this.fullScreenLoaderComponent.destroy();
      }
    } else {
      const imgWrapper = document.querySelector('div#' + options.key);
      imgWrapper.remove();
    }
  };

  ngAfterViewInit() {
    this.sproutApi.toastSubject.subscribe(options => this.handleToast(options));
    this.sproutApi.showLoaderBehavior.subscribe(options => this.showLoader(options));
    this.sproutApi.hideLoaderBehavior.subscribe(options => this.hideLoader(options));
  }

}
