import { MiddlewareAPI, AnyAction } from 'redux';
import { setLoading } from '../slices/loadingSlice';
import { AppDispatch, RootState } from '../store';
import { Middleware } from '@reduxjs/toolkit';

const asyncActionTracker: Middleware = (store: MiddlewareAPI<AppDispatch, RootState>) => (next: (action: AnyAction) => void) => (action: AnyAction) => {
  if (action.type.endsWith('/pending')) {
    store.dispatch(setLoading(true));
  }
  if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
    store.dispatch(setLoading(false));
  }
  return next(action);
};

export default asyncActionTracker;
