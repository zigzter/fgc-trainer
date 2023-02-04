import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import routinesSlice from '../features/Routines/routinesSlice';
// import selectionSlice from '../features/Selection/selectionSlice';

const preloadedState = localStorage.getItem('appState')
    ? JSON.parse(localStorage.getItem('appState') as string)
    : {
          roster: {
              characterSelected: '',
              gameSelected: '',
          },
          routines: [],
      };

const rootReducer = combineReducers({
    // routines: routinesSlice.reducer,
    // selection: selectionSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    preloadedState,
});

store.subscribe(() => {
    localStorage.setItem('appState', JSON.stringify(store.getState()));
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
// export type SelectionState = ReturnType<typeof selectionSlice.reducer>;
// export type RoutinesState = ReturnType<typeof routinesSlice.reducer>;

export default store;
