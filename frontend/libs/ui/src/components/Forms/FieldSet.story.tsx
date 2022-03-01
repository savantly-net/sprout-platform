import React from 'react';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { Input, Forms, FieldSet, Field } from '@sprout-platform/ui';
import mdx from './FieldSet.mdx';
import { Button } from '../Button';

export default {
  title: 'Forms/FieldSet',
  component: FieldSet,
  decorators: [withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const basic = () => {
  return (
    <Forms onSubmit={() => console.log('Submit')}>
      {() => (
        <>
          <FieldSet label="Details">
            <Field label="Name">
              <Input name="name" />
            </Field>
            <Field label="Email">
              <Input name="email" />
            </Field>
          </FieldSet>

          <FieldSet label="Preferences">
            <Field label="Color">
              <Input name="color" />
            </Field>
            <Field label="Font size">
              <Input name="fontsize" />
            </Field>
          </FieldSet>
          <Button variant="primary">Save</Button>
        </>
      )}
    </Forms>
  );
};
