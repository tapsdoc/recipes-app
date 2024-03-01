import {Ingredient} from "../shared/ingredient.model";
import {createReducer, on} from "@ngrx/store";
import * as slActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: new Ingredient('', 0),
    editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
    initialState,
    on(slActions.ADD_INGREDIENT, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
    }),
    on(slActions.ADD_INGREDIENTS, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
        };
    }),
    on(slActions.UPDATE_INGREDIENT, (state, action) => {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = action.ingredient;
        return {
            ...state,
            ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: new Ingredient('', 0)
        };
    }),
    on(slActions.DELETE_INGREDIENT, (state) => {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients.splice(state.editedIngredientIndex, 1);
        return {
            ...state,
            ingredients: updatedIngredients
        };
    }),
    on(slActions.START_EDIT, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: action.id,
            editedIngredient: { ...state.ingredients[action.id]}
        }
    }),
    on(slActions.STOP_EDIT, (state) => {
        return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: new Ingredient('', 0)
        }
    }),
    on(slActions.DEFAULT_ACTION, (state) => state)
);