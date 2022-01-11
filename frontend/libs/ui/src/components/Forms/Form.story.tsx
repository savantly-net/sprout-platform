import React, { useState } from 'react';

import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { withStoryContainer } from '../../utils/storybook/withStoryContainer';
import mdx from './Form.mdx';
import { ValidateResult } from 'react-hook-form';
import { boolean } from '@storybook/addon-knobs';
import {
  Field,
  Legend,
  Input,
  Button,
  Form,
  Switch,
  Checkbox,
  Select,
  InputControl,
  TextArea,
  RadioButtonGroup,
} from '@savantly/sprout-ui';

export default {
  title: 'Forms/Example forms',
  decorators: [withStoryContainer, withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const selectOptions = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
];

interface FormDTO {
  name: string;
  email: string;
  username: string;
  checkbox: boolean;
  switch: boolean;
  radio: string;
  select: string;
  text: string;
  nested: {
    path: string;
  };
}

const renderForm = (defaultValues?: Partial<FormDTO>) => (
  <Form
    defaultValues={defaultValues}
    onSubmit={(data: FormDTO) => {
      console.log(data);
    }}
  >
    {({ register, control, errors }) =>
      (console.log(errors) as any) || (
        <>
          <Legend>Edit user</Legend>

          <Field label="Name" invalid={!!errors.name} error="Name is required">
            <Input name="name" placeholder="Roger Waters" ref={register({ required: true })} />
          </Field>

          <Field label="Email" invalid={!!errors.email} error="E-mail is required">
            <Input id="email" name="email" placeholder="roger.waters@grafana.com" ref={register({ required: true })} />
          </Field>

          <Field label="Username">
            <Input name="username" placeholder="mr.waters" ref={register} />
          </Field>
          <Field label="Nested object">
            <Input name="nested.path" placeholder="Nested path" ref={register} />
          </Field>

          <Field label="Textarea" invalid={!!errors.text} error="Text is required">
            <TextArea name="text" placeholder="Long text" ref={register({ required: true })} />
          </Field>

          <Field label="Checkbox" invalid={!!errors.checkbox} error="We need your consent">
            <Checkbox name="checkbox" label="Do you consent?" ref={register({ required: true })} />
          </Field>

          <Field label="Switch">
            <Switch name="switch" ref={register} />
          </Field>

          <Field label="RadioButton">
            <InputControl name="radio" control={control} options={selectOptions} as={RadioButtonGroup} />
          </Field>

          <Field label="Select" invalid={!!errors.select} error="Select is required">
            <InputControl
              name="select"
              control={control}
              rules={{
                required: true,
              }}
              options={selectOptions}
              as={Select}
            />
          </Field>

          <Button type="submit">Update</Button>
        </>
      )
    }
  </Form>
);

export const basic = () => {
  return <>{renderForm()}</>;
};

export const defaultValues = () => {
  const defaultValues = [
    {
      name: 'Roger Waters',
      nested: {
        path: 'Nested path default value',
      },
      radio: 'option2',
      select: 'option1',
      switch: true,
    },
    {
      name: 'John Waters',
      nested: {
        path: 'Nested path default value updated',
      },
      radio: 'option1',
      select: 'option2',
      switch: false,
    },
  ];
  const [defaultsIdx, setDefaultsIdx] = useState(0);

  return (
    <>
      {renderForm(defaultValues[defaultsIdx])}
      <Button
        onClick={() => {
          setDefaultsIdx(s => (s + 1) % 2);
        }}
        variant="secondary"
      >
        Change default values
      </Button>
    </>
  );
};

export const asyncValidation = () => {
  const passAsyncValidation = boolean('Pass username validation', true);
  return (
    <>
      <Form
        onSubmit={(data: FormDTO) => {
          alert('Submitted successfully!');
        }}
      >
        {({ register, control, errors, formState }) =>
          (console.log(errors) as any) || (
            <>
              <Legend>Edit user</Legend>

              <Field label="Name" invalid={!!errors.name} error="Username is already taken">
                <Input
                  name="name"
                  placeholder="Roger Waters"
                  ref={register({ validate: validateAsync(passAsyncValidation) })}
                />
              </Field>

              <Button type="submit" disabled={formState.isSubmitting}>
                Submit
              </Button>
            </>
          )
        }
      </Form>
    </>
  );
};

const validateAsync = (shouldPass: boolean) => async () => {
  try {
    await new Promise<ValidateResult>((resolve, reject) => {
      setTimeout(() => {
        if (shouldPass) {
          resolve();
        } else {
          reject('Something went wrong...');
        }
      }, 2000);
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
