import { ClientApiService, LoaderOptions } from './client-api.service';
import { Component, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'my-client-api',
  templateUrl: './client-api.component.html',
  styleUrls: ['./client-api.component.css']
})
export class ClientApiComponent implements AfterViewInit {

  constructor(private sproutApi: ClientApiService, private snackBar: MatSnackBar) { }

  handleToast(options) {
    if (options) {
      if (typeof options === 'string') {
        this.snackBar.open(options, 'close');
      } else {
        this.snackBar.open(options);
      }
    }
  }

  showLoader = function (options: LoaderOptions) {
    if (options == null) {
      return; // probably just initialized, so return silently
    }
    if (!options.key) {
        throw new Error('A key is required to show the loader, so that it may be removed with the same key.');
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

  hideLoader = function (options: LoaderOptions) {
    if (options == null) {
      return; // probably just initialized, so return silently
    }
    if (!options.key) {
      throw new Error('A key is required to remove the loader');
    }
    const imgWrapper = document.querySelector('div#' + options.key);
    imgWrapper.remove();
  };

  ngAfterViewInit() {
    this.sproutApi.toastSubject.subscribe(options => this.handleToast(options));
    this.sproutApi.showLoaderBehavior.subscribe(options => this.showLoader(options));
    this.sproutApi.hideLoaderBehavior.subscribe(options => this.hideLoader(options));
  }

}
