import React from 'react';
import { FieldConfigEditorProps, ReducerID } from '@savantly/sprout-api';
import { StatsPicker } from '../StatsPicker/StatsPicker';

export const StatsPickerEditor: React.FC<FieldConfigEditorProps<string[], any>> = ({ value, onChange }) => {
  return <StatsPicker stats={value} onChange={onChange} allowMultiple={false} defaultStat={ReducerID.mean} />;
};
