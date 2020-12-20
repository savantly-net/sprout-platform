import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
  Slice,
  SliceCaseReducers
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { BaseEntityService } from './service';
import { EntityState, QueryResponse } from './types';

export interface EntityReducerProps<T> {
  stateKey: string;
  entityService: BaseEntityService<T>;
  initialState: EntityState<T>;
}

export class EntityStateProvider<T> {
  props: EntityReducerProps<T>;
  slice: Slice<EntityState<T>, SliceCaseReducers<EntityState<T>>, string>;
  loadState: AsyncThunk<AxiosResponse<QueryResponse<T> | T[]>, void, any>;

  constructor(props: EntityReducerProps<T>) {
    this.props = props;

    this.loadState = createAsyncThunk(`${props.stateKey}/load`, async (arg, thunkAPI) => {
      return props.entityService.load();
    });

    this.slice = createSlice({
      name: props.stateKey,
      initialState: props.initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(
          this.loadState.pending,
          (state, action: PayloadAction<any>): EntityState<T> => {
            return {
              ...state,
              isFetched: false,
              isFetching: true
            } as EntityState<T>;
          }
        );
        builder.addCase(
          this.loadState.fulfilled,
          (state, action: PayloadAction<AxiosResponse<QueryResponse<T> | T[]>>): EntityState<T> => {
            return {
              ...state,
              response: action.payload.data,
              isFetched: true,
              isFetching: false
            } as EntityState<T>;
          }
        );
        builder.addCase(
          this.loadState.rejected,
          (
            state,
            action: PayloadAction<
              any,
              string,
              { arg: void; requestId: string; aborted: boolean; condition: boolean },
              SerializedError
            >
          ): EntityState<T> => {
            return {
              ...state,
              isFetched: true,
              isFetching: false,
              error: action.error.message
            } as EntityState<T>;
          }
        );
      }
    });
  }
}
