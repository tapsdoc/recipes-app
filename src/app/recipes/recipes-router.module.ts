import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {authGuard} from "../auth/auth.guard";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

const routes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [authGuard],
        children: [
            {path: '', component: RecipeStartComponent},
            {path: 'list', component: RecipeListComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent},
            {path: ':id/edit', component: RecipeEditComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }