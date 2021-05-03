import { StandardEditorProps } from '@savantly/sprout-api';
import React, { Fragment } from 'react';
import { Input } from 'reactstrap';
import { useWidgetData } from '../api/widgetApi';
import { WidgetPanelOptions } from '../types';

export const WidgetDataSelector: React.FC<StandardEditorProps<string, any, WidgetPanelOptions>> = ({
  value,
  onChange,
  context,
  item
}) => {
  const availableData = useWidgetData(context.options?.dataSourceId || undefined);
  //const selectedData = useWidgetDataById(context.options?.dataSourceId || undefined, value);

  return (
    <div className="gf-form-group">
      <div className="edit-tab-content">
        <Input
          type="select"
          name="widgetDataSelector"
          id="widgetDataSelector"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <option></option>
          {availableData.map((d) => (
            <Fragment>
              <option value={d.id}>{d.name}</option>
            </Fragment>
          ))}
        </Input>
      </div>
    </div>
  );
};
