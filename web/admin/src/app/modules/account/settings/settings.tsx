import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../state/reducers/';
import { getSession } from '../../../state/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { Form, Row, Col, Button } from 'react-bootstrap';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event: any) => {

    /* TODO: Fix this
    const account = {
      ...props.account,
      ...values,
    };
    */

    props.saveAccountSettings({});
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            User settings for {props.account.login}
          </h2>
          <Form id="settings-form" onSubmit={handleValidSubmit}>
            {/* First name */}
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
              className="form-control"
              name="firstName"
              type="text"
              id="firstName"
              placeholder='first name'
              value={props.account.firstName}
              />
            </Form.Group>
            
            {/* Last name */}
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
              className="form-control"
              name="lastName"
              id="lastName"
              placeholder="last name"
              value={props.account.lastName}
              />
            </Form.Group>
            <Button color="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
