import React from 'react';
import { useParams } from 'react-router-dom';

export const DeleteForm = () => {
  const formId = useParams().formId;

  return (
    <div>
      <h1>Delete form - {formId} - Not implemented</h1>
    </div>
  );
};
