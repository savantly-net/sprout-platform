type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showMessage: boolean;
  messageSize: SeriesSize;
}

export interface ExampleAppSettings {
  customText?: string;
  customCheckbox?: boolean;
}

export interface AppForm {
  _id?: string;
  isActive: boolean;
  lastUpdated: number;
  form: AppFormDto;
  url: string;
  error: string;
}

export interface AppFormDto {
  _id?: string;
  title?: string;
  path?: string;
  name?: string;
  display: string;
  type: string;
  components?: any[];
  modified?: string;
  created?: string;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface QueryResponse<T> {
  content: T[] | [];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  numberOfElements: number;
  number: number;
  first: boolean;
  sort: Sort;
  empty: boolean;
}

export interface AppFormQueryResponse extends QueryResponse<AppForm> {}

export interface AppFormQueryState {
  error: string;
  forms: AppForm[] | [];
  isActive: boolean;
  limit: number;
  pagination: {
    numPages: number;
    page: number;
    total: number;
  };
  query: {
    type: string;
    tags: string[];
  };
  select: string;
  sort: string;
}

export interface AppFormSubmissionDto {
  _id?: string;
  formId?: string;
  data?: any;
  metadata?: any;
  state?: string;
}

export interface AppFormSubmission {
  formId?: string;
  _id?: string;
  isActive?: boolean;
  lastUpdated?: number;
  submission?: AppFormSubmissionDto;
  url?: string;
  error?: string;
}

export interface AppFormSubmissionQueryResponse extends QueryResponse<AppFormSubmission> {}
export interface AppFormSubmissionQueryState {
  error: string;
  formId: string;
  isActive: boolean;
  limit: number;
  pagination: {
    numPages: number;
    page: number;
    total: number;
  };
  query: any;
  select: string;
  sort: string;
  submissions: AppFormSubmission[] | [];
}

export interface FormModuleState {
  forms: AppFormQueryState;
  form: AppForm;
  submission: AppFormSubmission;
  submissions: AppFormSubmissionQueryState;
  event: any;
}

export interface FormModuleRootState {
  formModuleState: FormModuleState;
}
