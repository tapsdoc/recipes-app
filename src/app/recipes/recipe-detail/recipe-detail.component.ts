import {Component, OnInit} from '@angular/core';

import {Recipe} from '../../shared/recipe.model';
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe!: Recipe;
    id!: number;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'] + 1;
                this.recipeService.getRecipe(this.id).subscribe({
                    next: (recipe: Recipe) => {
                        this.recipe = recipe;
                    }, error: (error: any) => {
                        console.error(error);
                    }
                });
            }
        );
    }

    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
        this.router.navigate(['shopping-list']).then();
    }

    editRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route}).then();
    }

    onDelete() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['recipes']).then();
    }
}
