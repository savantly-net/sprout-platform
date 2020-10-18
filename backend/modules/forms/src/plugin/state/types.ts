export interface IForm {
  id: string;
  isActive: boolean;
  lastUpdated: number;
  form: any;
  url: string;
  error: string;
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

export interface IQueryResponse<T> {
    content: Array<T> | [];
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

export interface IFormQueryResponse extends IQueryResponse<IForm> {}

export interface IFormQueryState {
  error: string;
  response: IFormQueryResponse;
  isActive: boolean;
  limit: number;
  pagination: {
    numPages: number;
    page: number;
  };
  query: {
    type: string;
    tags: Array<string>;
  };
  select: string;
  sort: string;
}

export interface ISubmission {
  formId: string;
  id: string;
  isActive: boolean;
  lastUpdated: number;
  submission: any;
  url: string;
  error: string;
}

export interface ISubmissionQueryResponse extends IQueryResponse<ISubmission> {}
export interface ISubmissionQueryState {
  error: string;
  formId: string;
  isActive: false;
  limit: number;
  pagination: {
    numPages: number;
    page: number;
    total: number;
  };
  query: any;
  select: string;
  sort: string;
  response: ISubmissionQueryResponse;
}

export interface IFormModuleState {
  forms: IFormQueryState;
  form: IForm;
  submission: ISubmission;
  submissions: ISubmissionQueryState;
  event: any;
}

export interface IFormModuleRootState {
  formModuleState: IFormModuleState;
}

/*
export const initialFormModuleState: IFormModuleState = {
  form: {
    id: '',
    isActive: false,
    lastUpdated: 0,
    form: {},
    url: '',
    error: '',
  },
  submission: ,
  submissions: ,
  event: {
    form: {
      id: '',
      isActive: false,
      lastUpdated: 0,
      form: {},
      url: '',
      error: '',
    },
    submission: {
      formId: '',
      id: '',
      isActive: false,
      lastUpdated: 0,
      submission: {},
      url: '',
      error: '',
    },
    submissions: {
      error: '',
      formId: '',
      isActive: false,
      limit: 10,
      pagination: {
        numPages: 0,
        page: 1,
        total: 0,
      },
      query: {},
      select: '',
      sort: '',
      submissions: [],
    },
  },
};
*/