import React from "react";
import { provideTheme } from "../utils/ConfigProvider";

export class modalService {
    modalScope: any;
    reactModalRoot = document.body;
    reactModalNode = document.createElement('div');

    init() {

    }
/*
    showModalReact(options: any) {
        const { component, props } = options;
        const modalProps = {
          component,
          props: {
            ...props,
            isOpen: true,
            onDismiss: this.onReactModalDismiss,
          },
        };
    
        const elem = React.createElement(provideTheme(AngularModalProxy), modalProps);
        this.reactModalRoot.appendChild(this.reactModalNode);
        return ReactDOM.render(elem, this.reactModalNode);
      }
    
      onReactModalDismiss = () => {
        ReactDOM.unmountComponentAtNode(this.reactModalNode);
        this.reactModalRoot.removeChild(this.reactModalNode);
      };
      */
}

export default modalService;