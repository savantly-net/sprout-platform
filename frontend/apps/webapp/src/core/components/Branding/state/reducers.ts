import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBrandingStyles, StyleMap } from '../brandingService';

export interface BrandingState {
  styleMaps: StyleMap[];
  loading: boolean;
  error: string;
  fetched: boolean;
}

export const initialBrandingState: BrandingState = {
  loading: false,
  styleMaps: [],
  error: '',
  fetched: false
};

export const loadBrandingStyleMaps = createAsyncThunk('branding/loadStyleMaps', async (arg, thunkAPI) => {
  const response = await getBrandingStyles();
  console.log(response);
  if (response.data) {
    return response.data;
  } else {
    return thunkAPI.rejectWithValue(response);
  }
});

const brandingSlice = createSlice({
  name: 'branding',
  initialState: initialBrandingState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadBrandingStyleMaps.fulfilled,
      (state, action): BrandingState => {
        console.log(action);
        return {
          ...state,
          styleMaps: action.payload,
          error: '',
          fetched: true
        };
      }
    );
    builder.addCase(
      loadBrandingStyleMaps.rejected,
      (state, action): BrandingState => {
        console.error(action);
        return {
          ...state,
          error: action.error.message || action.error.code || 'failed to load branding styles',
          fetched: true
        };
      }
    );
  }
});

//export const {  } = brandingSlice.actions;

export const brandingReducer = brandingSlice.reducer;
