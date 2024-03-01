import {createAction, props} from "@ngrx/store";
import {AuthData} from "../../services/auth.service";

export const LOGIN = createAction(
    'LOGIN',
    props<{ payload: AuthData }>()
);

export const LOGOUT = createAction('LOGOUT');