import { combineReducers } from "redux";
import { userReducer } from './users';


export const rootReducer = combineReducers({
  users: userReducer
});

// ReturnType checks whatever is in the parameter, and just returns the return type
// ? Here it will grab all of the types from all of our reducers and store them in the state
export type AppState = ReturnType<typeof rootReducer>

