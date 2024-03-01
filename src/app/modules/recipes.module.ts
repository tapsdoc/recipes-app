import {NgModule} from "@angular/core";
import {RecipesComponent} from "../recipes/recipes.component";
import {RecipeListComponent} from "../recipes/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "../recipes/recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "../recipes/recipe-list/recipe-item/recipe-item.component";
import {RecipeEditComponent} from "../recipes/recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "../recipes/recipe-start/recipe-start.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RecipesRoutingModule} from "../recipes/recipes-router.module";
import {SharedModule} from "./shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        RecipeStartComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        CommonModule,
        SharedModule
    ]
})
export class RecipesModule { }