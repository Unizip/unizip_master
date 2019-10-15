import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AppState } from '../reducers/index';
import { AppActions } from '../types/actions';


export default function configureStore() {
 return createStore(
  rootReducer,
   applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
 );
}