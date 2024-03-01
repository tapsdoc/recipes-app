import {createReducer, on} from "@ngrx/store";
import {User} from "../../shared/user.model";
import {LOGIN, LOGOUT} from "./auth.action";
import {state} from "@angular/animations";

export interface State {
    user: User;
}

const initialState = {
    user: new User('', '')
};
export const authReducer = createReducer(
    initialState,
    on(LOGIN, (state, action) => {
        const user = new User(action.payload.email, action.payload.password);
        return {
            ...state,
            user: user
        }
    }),
    on(LOGOUT, (state) => {
        return state
    })
    );