import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import {Store} from "@ngrx/store";
import * as slActions from "../shopping-list.actions";
import * as fromApp from "../../shared/app.reducer"

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    
    slForm!: FormGroup;
    ingredient!: Ingredient;
    subs!: Subscription;
    editMode = false;
    
    constructor(
        private slService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) { }
    
    ngOnInit() {
        this.slForm = new FormGroup({
            name: new FormControl('', Validators.required),
            amount: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
        });
        this.subs = this.store.select('shoppingList').subscribe(state => {
           if (state.editedIngredientIndex > -1) {
               this.editMode = true;
               this.ingredient = state.editedIngredient;
               this.slForm.patchValue({
                   name: this.ingredient.name,
                   amount: this.ingredient.amount
               });
           } else {
               this.editMode = false;
           }
        });
    }
    
    onAddItem() {
        if (this.slForm.valid) {
            if (this.editMode) {
                // this.slService.updateIngredient(this.index, this.slForm.value);
                this.store.dispatch(slActions.UPDATE_INGREDIENT({
                    ingredient: this.slForm.value
                }));
            } else {
                // this.slService.addIngredient(this.slForm.value);
                this.store.dispatch(slActions.ADD_INGREDIENT(this.slForm.value));
            }
            this.slForm.reset();
            
        }
    }
    
    onDelete() {
        // this.slService.deleteIngredient(this.index);
        this.store.dispatch(slActions.DELETE_INGREDIENT());
        this.onClear();
    }
    
    onClear() {
        this.slForm.reset();
        this.editMode = false;
        this.store.dispatch(slActions.STOP_EDIT());
    }
    
    ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.store.dispatch(slActions.STOP_EDIT());
    }
}
