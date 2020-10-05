import { UrlQueryValue } from "@savantly/sprout-api";
import { KioskUrlValue } from "../../types";

export const setViewModeBodyClass = (body: JQuery, mode?: KioskUrlValue | UrlQueryValue | null) => {
    body.removeClass('view-mode--tv');
    body.removeClass('view-mode--kiosk');
    body.removeClass('view-mode--inactive');
  
    switch (mode) {
      case 'tv': {
        body.addClass('view-mode--tv');
        break;
      }
      case true: {
        body.addClass('view-mode--kiosk');
        break;
      }
    }
  }
