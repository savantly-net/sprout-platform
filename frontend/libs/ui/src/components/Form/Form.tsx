import { css } from 'emotion';
import { Form as FormikForm, Formik, FormikConfig, FormikProps, FormikValues } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';

export interface FormProps<Values> {
  submitText?: string;
  cancelText?: string;
  showButtonsOnTop?: boolean;
  onCancel?: () => void;
  showCancelButton: boolean;
  showSubmitButton: boolean;
  children: ((props: FormikProps<Values>) => React.ReactElement) | React.ReactElement;
}

export const Form = <Values extends FormikValues = FormikValues, ExtraProps = {}>(
  props: FormikConfig<Values> & ExtraProps & FormProps<Values>
) => {
  const renderButtons = ({ isSubmitting }: { isSubmitting: boolean }) => {
    return (
      <Row
        mt={props.showButtonsOnTop ? 0 : 2}
        mb={props.showButtonsOnTop ? 2 : 0}
        className="d-flex justify-content-between flex-row-reverse"
      >
        <Button
          className={css({
            display: props.showSubmitButton ? 'unset' : 'none',
          })}
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {props.submitText}
        </Button>
        <Button
          className={css({
            display: props.showCancelButton ? 'unset' : 'none',
          })}
          color="secondary"
          disabled={isSubmitting}
          onClick={props.onCancel}
        >
          {props.cancelText}
        </Button>
      </Row>
    );
  };

  const renderChildren = (childrenProps: FormikProps<Values>) => {
    if (props.children) {
      if (_.isFunction(props.children)) {
        return props.children(childrenProps);
      } else {
        return props.children;
      }
    } else {
      return (
        <div>
          <p className="text-danger">There aren't any children in the form.</p>
        </div>
      );
    }
  };
  return (
    <Formik {...props}>
      {(childrenProps) => {
        const { isSubmitting } = childrenProps;
        return (
          <FormikForm>
            {props.showButtonsOnTop && <Col mb={2}>{renderButtons({ isSubmitting })}</Col>}
            {renderChildren(childrenProps)}
            {!props.showButtonsOnTop && <Col mt={2}>{renderButtons({ isSubmitting })}</Col>}
          </FormikForm>
        );
      }}
    </Formik>
  );
};
Form.defaultProps = {
  submitText: 'Submit',
  cancelText: 'Cancel',
  showButtonsOnTop: false,
  showCancelButton: true,
  showSubmitButton: true,
  onCancel: () => {}
};
