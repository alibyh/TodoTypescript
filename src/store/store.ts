import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const MyStore = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

type toReduxState = ReturnType<typeof MyStore.getState>;
type AppDispatch = typeof MyStore.dispatch;


export const useMyAppDispatch = () => useDispatch<AppDispatch>();
export const useMyAppSelector: TypedUseSelectorHook<toReduxState> = useSelector;