import {Component, OnDestroy, OnInit} from '@angular/core';

import {Recipe} from '../../shared/recipe.model';
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[] = [];
    subs!: Subscription;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        /*this.subs = this.recipeService.recipesChanged.subscribe(recipes => {
            this.recipes = recipes;
        });*/
        this.subs = this.recipeService.getRecipes().subscribe(
            (res) => {
                this.recipes = res;
            }
        );
    }

    onAddRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route}).then();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}