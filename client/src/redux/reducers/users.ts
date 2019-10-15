import { User } from '../types/User'
import { UserActionTypes } from '../types/actions';

const usersDefaultState: User[] = [];


const userReducer = (state = usersDefaultState, action: UserActionTypes): User[] => {
    switch (action.type){
        case "ADD_USER":
            return [...state, action.user]
        case "DELETE_USER":
            return state.filter(({ id }) => id !== action.id);
        case "EDIT_USER":
            return state.map(user => {
                if (user.id === action.user.id){
                    return {
                        ...user,
                        ...action.user
                    }
                } else {
                    return user;
                }
            })
        default:
            return state;
    }
}

export { userReducer }