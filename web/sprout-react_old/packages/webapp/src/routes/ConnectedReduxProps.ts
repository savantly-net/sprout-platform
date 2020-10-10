import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { match } from 'react-router';

/**
 * Additional props for connected React components.
 * This prop is passed by default with `connect()`
 * Note - `match` is provided by React Router and not connected in RouterState,
 * so passed in below as additional prop
 */
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
  match: match<any>;
}