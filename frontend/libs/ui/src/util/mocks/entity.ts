import { BaseEntityService, EntityState, EntityStateProvider } from '@savantly/sprout-api';

export interface DemoEntity {
  id?: string;
  name: string;
}

export const demoEntities: DemoEntity[] = [
  {
    id: '1',
    name: 'Hello World'
  },
  {
    id: '2',
    name: 'Hello Again'
  }
];

export class DemoEntityService extends BaseEntityService<DemoEntity> {
  constructor() {
    super({ baseUrl: 'https://postman-echo.com/' });
  }
}

const demoSort = {
  sorted: false,
  unsorted: true,
  empty: false
};

export const demoEntityState_fetched: EntityState<DemoEntity> = {
  error: '',
  isFetched: true,
  isFetching: false,
  response: {
    content: demoEntities,
    pageable: {
      sort: demoSort,
      offset: 0,
      pageNumber: 0,
      pageSize: 20,
      unpaged: true,
      paged: false
    },
    empty: false,
    first: true,
    last: true,
    number: 0,
    numberOfElements: demoEntities.length,
    size: 20,
    sort: demoSort,
    totalElements: demoEntities.length,
    totalPages: 1
  },
  example: {
    name: ''
  }
};

export const demoEntityStateProvider: EntityStateProvider<DemoEntity> = {
  props: {
    entityService: new DemoEntityService(),
    initialState: demoEntityState_fetched,
    stateKey: 'demo'
  },
  loadState: (() => {}) as any,
  slice: {} as any
};
