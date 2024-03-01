import {createAction, props} from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";
export const DEFAULT_ACTION = createAction('Default Action');

export const ADD_INGREDIENT = createAction(
    'ADD INGREDIENT',
    (payload: Ingredient) => ({ payload })
);

export const ADD_INGREDIENTS = createAction(
    'ADD_INGREDIENTS',
    (payload: Ingredient[]) => ({ payload })
);

export const UPDATE_INGREDIENT = createAction(
    'Update Ingredient',
    props<{ ingredient: Ingredient }>()
);

export const DELETE_INGREDIENT = createAction(
    'Delete Ingredient'
);

export const START_EDIT = createAction(
    'START_EDIT',
    props<{ id: number }>()
);

export const STOP_EDIT = createAction('STOP_EDIT');