import { getApiService } from '@savantly/sprout-runtime';
import { API_URL } from 'plugin/config/formModuleConfiguration';
import { AppForm, AppFormDto } from 'plugin/types';
import { useEffect, useState } from 'react';

export const useAppForm = (formId: string) => {
  const [form, setForm] = useState(undefined as AppForm | undefined);

  useEffect(() => {
    let isCancelled = false;
    if (formId && !form) {
      const url = `${API_URL}/form/${formId}`;
      getApiService()
        .get<AppFormDto>(url)
        .then(result => {
          if (!isCancelled) {
            setForm({
              error: '',
              isActive: false,
              lastUpdated: 0,
              _id: result.data._id,
              url: url,
              form: result.data,
            });
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [formId, form]);

  return form;
};
