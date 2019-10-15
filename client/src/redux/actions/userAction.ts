import { User } from "../types/User";
import { AppActions } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../reducers";
import uuid from 'uuid';

//> AppActions here represents all the different return types that our redux store offers
export const addUser = (user: User): AppActions => ({
  type: "ADD_USER",
  user
});

export const editUser = (user: User): AppActions => ({
  type: "EDIT_USER",
  user
});

export const deleteUser = (id: string): AppActions => ({
  type: "DELETE_USER",
  id
});


// - this action actually creates the user. It dispatches the above addUser action to the reducer. 


export const startAddUser = (userData: {
  firstName: string;
  lastName: string;
  dob: string;
  joinDate: string;
  createdAt: number;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        /// the = syntax here means default values
        const {
            firstName = "",
            lastName = "",
            dob = "",
            joinDate = new Date().toISOString(),
            createdAt = 0
        } = userData;

        const newUser = { firstName, lastName, dob, joinDate, createdAt }

        const id = uuid();

        return dispatch(
            addUser({
                id, 
                ...newUser
            })
        )
    }
};

export const startDeleteUser = (id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(deleteUser(id));
    }
}

export const startEditUser = (user: User) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(editUser(user));
    }
}
