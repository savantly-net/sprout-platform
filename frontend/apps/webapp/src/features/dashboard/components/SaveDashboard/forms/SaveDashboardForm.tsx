import { selectors } from '@grafana/e2e-selectors';
import { Form  } from '@savantly/sprout-ui';
import { HorizontalGroup ,TextArea ,Button} from '@sprout-platform/ui';
// import { Button } from '@chakra-ui/react';
import React from 'react';
import { SaveDashboardFormProps } from '../types';

interface SaveDashboardFormDTO {
  message: string;
  saveVariables: boolean;
  saveTimerange: boolean;
}

export const SaveDashboardForm: React.FC<SaveDashboardFormProps> = ({ dashboard, onCancel, onSuccess, onSubmit }) => {
  return (
    <Form
      onSubmit={async (data: SaveDashboardFormDTO) => {
        if (!onSubmit) {
          return;
        }

        const result = await onSubmit(dashboard.getSaveModelClone(data), data, dashboard);
        if (result.status === 200) {
          onSuccess();
        }
      }}
    >
      {({ register, errors }) => (
        <>
          <div className="gf-form-group">
            <TextArea
              css={null}
              name="message"
              ref={register}
              placeholder="Add a note to describe your changes..."
              autoFocus
            />
          </div>

          <HorizontalGroup>
            <Button type="submit" aria-label={selectors.pages.SaveDashboardModal.save}>
              Save
            </Button>
            <Button variant="link" onClick={onCancel}>
              Cancel
            </Button>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
