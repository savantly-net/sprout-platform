import { ConfirmModal, Modal } from '@savantly/sprout-ui';
import React, { createRef, ReactElement, Ref } from 'react';
import { CoreEvents } from '../../../types';
import appEvents from '../../app_events';
import { ThemeProvider } from '../../utils/ConfigProvider';
import LifecycleLogging from '../LifecycleLogging/LifecycleLogging';

interface OwnProps {}
interface OwnState {
  component: ReactElement<any, any> | null;
}
export class ModalProxy extends React.Component<OwnProps, OwnState> {
  ref: Ref<any>;
  constructor(props: OwnProps) {
    super(props, {
      logType: 'object',
      names: ['nextProps', 'nextState', 'prevProps', 'prevState', 'props']
    });
    this.state = {
      component: null
    };
    this.ref = createRef();
  }

  componentDidMount() {
    appEvents.on(CoreEvents.showConfirmModal, this.showConfirmModal.bind(this));
    appEvents.on(CoreEvents.showModalReact, this.showModalReact.bind(this));
    this.onReactModalDismiss.bind(this);
  }
  shouldComponentUpdate() {
    return true;
  }

  showModalReact(options: any) {
    const { component } = options;
    const modalProps = {
      ...options.props,
      isOpen: true,
      onDismiss: this.onReactModalDismiss
    };
    this.setState({
      component: <Modal {...modalProps}>{component}</Modal>
    });
  }

  showConfirmModal(options: any) {
    const confirmModalProps = {
      /** Toggle modal's open/closed state */
      isOpen: true,
      /** Title for the modal header */
      title: options.title || 'Confirm',
      /** Modal content */
      body: (
        <div>
          <h3>{options.text}</h3>
          <br />
          {options.text2}
        </div>
      ),
      /** Text for confirm button */
      confirmText: options.confirmText || 'YES',
      /** Text for dismiss button */
      dismissText: options.dismissText || 'Cancel',
      /** Icon for the modal header */
      icon: options.icon,
      /** Confirm action callback */
      onConfirm: () => {
        options.onConfirm && options.onConfirm();
        this.onReactModalDismiss();
      },
      /** Dismiss action callback */
      onDismiss: () => {
        options.onDismiss && options.onDismiss();
        this.onReactModalDismiss();
      }
    };
    this.setState({
      component: <ConfirmModal {...confirmModalProps} />
    });
  }

  onReactModalDismiss = () => {
    this.setState({ component: null });
  };

  render() {
    return <ThemeProvider>{this.state.component}</ThemeProvider>;
  }
}

export default ModalProxy;
