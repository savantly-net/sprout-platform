import React, { useState } from 'react';
import mdx from './RadioButtonGroup.mdx';
import { RadioButtonGroup } from './RadioButtonGroup';
import { RadioButtonSize } from './RadioButton';
import { boolean, select } from '@storybook/addon-knobs';

export default {
  title: 'Forms/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sizes: RadioButtonSize[] = ['sm', 'md'];

export const simple = () => {
  const [selected, setSelected] = useState('graphite');
  const BEHAVIOUR_GROUP = 'Behaviour props';
  const disabled = boolean('Disabled', false, BEHAVIOUR_GROUP);
  const disabledItem = select('Disabled item', ['', 'graphite', 'prometheus', 'elastic'], '', BEHAVIOUR_GROUP);
  const VISUAL_GROUP = 'Visual options';
  const size = select<RadioButtonSize>('Size', sizes, 'md', VISUAL_GROUP);

  const options = [
    { label: 'Prometheus', value: 'prometheus' },
    { label: 'Graphite', value: 'graphite' },
    { label: 'Elastic', value: 'elastic' },
  ];

  return (
    <RadioButtonGroup
      options={options}
      disabled={disabled}
      disabledOptions={[disabledItem]}
      value={selected}
      onChange={v => setSelected(v!)}
      size={size}
    />
  );
};

export const fullWidth = () => {
  const [selected, setSelected] = useState('elastic');
  const BEHAVIOUR_GROUP = 'Behaviour props';
  const disabled = boolean('Disabled', false, BEHAVIOUR_GROUP);
  const disabledItem = select('Disabled item', ['', 'graphite', 'prometheus', 'elastic'], '', BEHAVIOUR_GROUP);
  const VISUAL_GROUP = 'Visual options';
  const size = select<RadioButtonSize>('Size', sizes, 'md', VISUAL_GROUP);

  const options = [
    { label: 'Prometheus', value: 'prometheus' },
    { label: 'Graphite', value: 'graphite' },
    { label: 'Elastic', value: 'elastic' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <RadioButtonGroup
        options={options}
        disabled={disabled}
        disabledOptions={[disabledItem]}
        value={selected}
        onChange={v => setSelected(v!)}
        size={size}
        fullWidth
      />
    </div>
  );
};
