export interface TenantId {
  tenantId: string;
  itemId: string;
}

export interface TenantedEntity {
  id?: TenantId;
  /**
   * Transient item id provided by server for convienence
   * This is not deserialized by the server. The id:TenantId is used on the server for identification
   */
  itemId?: string;
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
  content: T[];
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

export interface PagedEntityState<T> {
  response?: QueryResponse<T>;
  error?: string;
  isFetching: boolean;
  isFetched: boolean;
  example: T;
}

export interface UnpagedEntityState<T> {
  response?: T[];
  error?: string;
  isFetching: boolean;
  isFetched: boolean;
  example: T;
}

export interface EntityState<T> extends Omit<PagedEntityState<T>, 'response'>, Omit<UnpagedEntityState<T>, 'response'> {
  response?: QueryResponse<T> | T[];
}
