import { BaseEntityService, EntityState } from '@savantly/sprout-api';
import { AxiosResponse } from 'axios';
import React, { Component, ReactElement } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { DataTable, DataTableColumnProvider } from '../DataTable/DataTable';

export interface EntityEditorProps<T> {
  entity: T;
  save: (entity: T) => Promise<AxiosResponse<T> | AxiosResponse<any>>;
  cancel: () => void;
}

export interface EntityPageProps<T> {
  title?: string;
  subTitle?: string;
  entityState: EntityState<T>;
  entityEditor: (props: EntityEditorProps<T>) => ReactElement;
  entityService: BaseEntityService<T>;
  entityKeyField: string;
  columndescriptions: ColumnDescription[];
  onDeleteError: (error: AxiosResponse<any>) => void;
  afterDelete: () => void;
}

export interface EntityPageState<T> {
  modalState: T | false;
  modalError: string;
  error: string;
}

export class EntityPage<T> extends Component<EntityPageProps<T>, EntityPageState<T>> {
  constructor(props: EntityPageProps<T>) {
    super(props);
    this.save = this.save.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.state = {
      modalState: false,
      modalError: '',
      error: ''
    };
  }

  save(values: T) {
    const { entityService } = this.props;
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      entityService
        .create(values)
        .then((response) => {
          console.log('created', response.data);
          this.setState({
            ...this.state,
            modalState: false
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteOne(values: T) {
    const { entityKeyField, afterDelete, onDeleteError, entityService } = this.props;
    const entityId = (values as any)[entityKeyField];
    if (entityId) {
      entityService
        .delete(entityId)
        .then((response) => {
          console.log(response);
          afterDelete();
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            ...this.state,
            error: error.message || error.status || error.detail
          });
          onDeleteError(error);
        });
    }
  }

  render() {
    const Editor = this.props.entityEditor;
    const { title, subTitle, entityState, columndescriptions } = this.props;
    const { modalError, modalState } = this.state;
    return (
      <div>
        {title && <h3>{title}</h3>}
        {subTitle && <h4>{subTitle}</h4>}
        <Modal isOpen={!!modalState}>
          <ModalHeader
            toggle={() => {
              this.setState({
                ...this.state,
                modalState: false
              });
            }}
          >
            Create One
          </ModalHeader>
          <ModalBody>
            {Editor({
              entity: modalState as T,
              save: this.save,
              cancel: () => {
                this.setState({
                  ...this.state,
                  modalState: false
                });
              }
            })}
          </ModalBody>
          <ModalFooter>{modalError && <Alert color="danger">{modalError}</Alert>}</ModalFooter>
        </Modal>
        <DataTable
          entityState={entityState}
          onCreateClick={() =>
            this.setState({
              ...this.state,
              modalState: entityState.example
            })
          }
          columnProvider={
            new DataTableColumnProvider<T>({
              onDeleteClick: (values: T) => this.deleteOne(values),
              onEditClick: (values: T) => {
                this.setState({
                  ...this.state,
                  modalState: values
                });
              },
              columnDescriptions: columndescriptions
            })
          }
        ></DataTable>
      </div>
    );
  }
}
