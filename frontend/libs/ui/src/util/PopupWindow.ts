import { toParams, toQuery } from './url';

class PopupWindow {
  id: string;
  url: string;
  popupOptions: any;
  otherOptions: any;
  locationKey: string;
  window: any;
  promise?: Promise<any>;
  intervalId?: number;

  constructor(id: string, url: string, popupOptions: any = {}, otherOptions: any = {}) {
    this.id = id;
    this.url = url;
    this.popupOptions = popupOptions;
    this.otherOptions = otherOptions;
    this.locationKey = otherOptions.locationKey;
  }

  open() {
    this.window = window.open(this.url, this.id, toQuery(this.popupOptions, ','));
  }

  close() {
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this.intervalId = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error('The popup was closed for an unexpected reason'));

            return;
          }

          if (popup.location.href === this.url || popup.location.pathname === 'blank') {
            // location unchanged, still polling
            return;
          }

          if (!['search', 'hash'].includes(this.locationKey)) {
            reject(new Error(`Cannot get data from location.${this.locationKey}, check the responseType prop`));
            this.close();
            return;
          }
          const locationValue = popup.location[this.locationKey];
          const params = toParams(locationValue);
          resolve(params);

          this.close();
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500);
    });
  }

  cancel() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  then(...args: any[]) {
    return this.promise?.then(...args);
  }

  catch(...args: any[]) {
    return this.promise?.catch(...args);
  }

  static open(id: string, url: string, popupOptions: any = {}, otherOptions: any = {}) {
    const popup = new this(id, url, popupOptions, otherOptions);

    popup.open();
    popup.poll();

    return popup;
  }
}

export default PopupWindow;
