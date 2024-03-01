import {Recipe} from "../shared/recipe.model";
import {Injectable} from "@angular/core";
import {ShoppingListService} from "./shopping-list.service";
import {Ingredient} from "../shared/ingredient.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ADD_INGREDIENTS} from "../shopping-list/shopping-list.actions";
import * as fromApp from "../shared/app.reducer"

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            '/assets/recipes6.jpg',
            [
                new Ingredient('Apples', 5),
                new Ingredient('Tomatoes', 10),
            ]
        ),
        new Recipe(
            'Another Test Recipe',
            'This is simply a test',
            '/assets/recipes3.jpg',
            [
                new Ingredient('Banana', 7),
                new Ingredient('Grapes', 3),
            ]
        )
    ];
    recipesChanged = new Subject<Recipe[]>();
    
    constructor(
        private slService: ShoppingListService,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
    
    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>("http://localhost:8080/api/v1/recipes/all");
        // return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.http.get<Recipe>(`http://localhost:8080/api/v1/recipes/` + id);
        // return this.recipes.slice()[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.slService.addIngredients(ingredients);
        this.store.dispatch(ADD_INGREDIENTS(ingredients));
    }

    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>("http://localhost:8080/api/v1/recipes/add", recipe);
        // this.recipes.push(recipe);
        // this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(id: number, recipe: Recipe) {
        // this.recipes[id] = recipe;
        // this.recipesChanged.next(this.recipes.slice());
        return this.http.put<Recipe>("http://localhost:8080/api/v1/recipes/update/" + id, recipe);
    }

    deleteRecipe(id: number) {
        // this.recipes.splice(id, 1);
        // this.recipesChanged.next(this.recipes.slice());
        return this.http.delete("http://localhost:8080/api/v1/recipes/delete/" + id);
    }
}