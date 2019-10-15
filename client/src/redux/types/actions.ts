import { User } from './User';

export const ADD_USER = "ADD_USER"
export const EDIT_USER = "EDIT_USER"
export const DELETE_USER = "DELETE_USER"


export interface EditUserAction {
    type: typeof EDIT_USER;
    user: User;
}
export interface AddUserAction {
    type: typeof ADD_USER;
    user: User;
}
export interface DeleteUserAction {
    type: typeof DELETE_USER;
    id: string;
}

// > This represents the different action types for users
export type UserActionTypes = EditUserAction | AddUserAction | DeleteUserAction


//> this represents all actions throughout the application
// ? Add more by using a single | operator
export type AppActions = UserActionTypes