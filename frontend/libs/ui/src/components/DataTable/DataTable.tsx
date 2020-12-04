import { EntityState } from '@savantly/sprout-api';
import React, { FC, Fragment, ReactElement } from 'react';
import BootstrapTable, { BootstrapTableProps, ColumnDescription } from 'react-bootstrap-table-next';
import { Alert, Button, ButtonGroup, Nav, Navbar, NavItem } from 'reactstrap';
import { confirm, ConfirmModalProps } from '../ConfirmModal/ConfirmModal';
import { Icon } from '../Icon/Icon';

export interface DataTableColumnProviderProps<T> {
  columnDescriptions: ColumnDescription[];
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  extraActions?: ReactElement;
  deleteModalProps?: ConfirmModalProps;
}

export class DataTableColumnProvider<T> {
  private _onEditClick: (row: T) => void;
  private _onDeleteClick: (row: T) => void;
  private props: DataTableColumnProviderProps<T>;

  constructor(props: DataTableColumnProviderProps<T>) {
    this.props = props;
    this._onEditClick =
      props.onEditClick ||
      (row => {
        console.log('edit clicked', JSON.stringify(row));
      });

    const deleteClick =
      props.onDeleteClick ||
      (row => {
        console.log('delete clicked', JSON.stringify(row));
      });

    this._onDeleteClick = row => {
      confirm(props.deleteModalProps || { onClose: () => {} }).then(result => {
        if (result) {
          deleteClick(row);
        } else {
          console.log('canceled', JSON.stringify(row));
        }
      });
    };
  }

  getColumnDescriptions() {
    return [
      ...this.props.columnDescriptions,
      {
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        formatter: (cell: any, row: T) => {
          return (
            <ButtonGroup>
              <Button onClick={() => this._onEditClick(row)} color="info">
                <Icon name="pen" />
              </Button>
              <Button onClick={() => this._onDeleteClick(row)} color="danger">
                <Icon name="trash-alt" />
              </Button>
              {this.props.extraActions && this.props.extraActions}
            </ButtonGroup>
          );
        },
      },
    ];
  }
}

export interface DataTableRowEditor<T> {
  editRow?: (row: T) => T;
  hasError: () => null | ReactElement | string;
}

export interface DataTableProps<T extends object = any>
  extends Omit<BootstrapTableProps, 'keyField' | 'data' | 'columns'> {
  keyField?: string;
  entityState: EntityState<T>;
  columnProvider: DataTableColumnProvider<T>;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
  leftNav?: ReactElement;
  rightNav?: ReactElement;
  createButtonText?: string;
}

export const DataTable: FC<DataTableProps<any>> = ({
  keyField = 'itemId',
  entityState,
  columnProvider,
  onCreateClick,
  showCreateButton = true,
  leftNav,
  rightNav,
  createButtonText = 'Create',
  ...rest
}: DataTableProps<any>) => {

  return (
    <div>
      <Fragment>
        {entityState.error && <Alert color="danger">{entityState.error}</Alert>}
        <Navbar color="light" light>
          <Nav className="mr-auto">{leftNav && leftNav}</Nav>
          <Nav className="ml-auto">
            {rightNav && rightNav}
            {showCreateButton && (
              <NavItem>
                <Button color="secondary" onClick={() => onCreateClick && onCreateClick()}>
                  {createButtonText}
                </Button>
              </NavItem>
            )}
          </Nav>
        </Navbar>
        <BootstrapTable
          keyField={keyField}
          data={entityState.response?.content || []}
          columns={columnProvider.getColumnDescriptions()}
          striped
          hover
          condensed
          {...rest}
        />
      </Fragment>
    </div>
  );
};
