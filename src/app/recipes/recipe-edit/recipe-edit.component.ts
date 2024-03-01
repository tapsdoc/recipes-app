import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Recipe} from "../../shared/recipe.model";

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    id!: number;
    editMode = false;
    recipeForm!: FormGroup;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        );
    }

    onSubmit() {
        if (this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value).subscribe({
                next: res => {
                    this.recipeService.getRecipes();
                }, error: err => {
                    console.log(err.error.message);
                }
            });
        } else {
            this.recipeService.addRecipe(this.recipeForm.value).subscribe({
                next: res => {
                    this.recipeService.getRecipes();
                }, error: err => {
                    console.log(err.error.message);
                }
            });
        }
        this.onCancel();
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl('', Validators.required),
                'amount': new FormControl(0, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route}).then();
    }

    private initForm() {
        let recipeName = '';
        let recipeImage = '';
        let recipeDesc = '';
        let ingredients = new FormArray<any>([]);

        if (this.editMode) {
            this.recipeService.getRecipe(this.id).subscribe({
                next: (recipe: Recipe) => {
                    recipeName = recipe.name;
                    recipeImage = recipe.imagePath;
                    recipeDesc = recipe.description;

                    if (recipe.ingredients) {
                        recipe.ingredients.forEach(ingredient => ingredients.push(
                            new FormGroup({
                                'name': new FormControl(ingredient.name, Validators.required),
                                'amount': new FormControl(ingredient.amount, [
                                    Validators.required,
                                    Validators.pattern(/^[1-9]+[0-9]*$/)
                                ])
                            })
                        ));
                    }

                    this.recipeForm = new FormGroup({
                        'name': new FormControl(recipeName, Validators.required),
                        'imagePath': new FormControl(recipeImage, Validators.required),
                        'description': new FormControl(recipeDesc, Validators.required),
                        'ingredients': ingredients
                    });
                }, error: (error: any) => {
                    console.error(error);
                }
            });
        } else {
            this.recipeForm = new FormGroup({
                'name': new FormControl(recipeName, Validators.required),
                'imagePath': new FormControl(recipeImage, Validators.required),
                'description': new FormControl(recipeDesc, Validators.required),
                'ingredients': ingredients
            });
        }
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    removeIngredient(id: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
    }
}
