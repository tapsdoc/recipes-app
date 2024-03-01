import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "../services/shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as slActions from "./shopping-list.actions";
import * as fromApp from "../shared/app.reducer"

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    @Output() selected = new EventEmitter<Ingredient>();
    ingredients$!: Observable<{ ingredients: Ingredient[] }>;
    private subs!: Subscription;
    
    constructor(
        private slService: ShoppingListService,
        private store: Store<fromApp.AppState>
) {
    }
    
    ngOnInit() {
        this.ingredients$ = this.store.select('shoppingList');
        // this.ingredients = this.slService.getIngredients();
        // this.subs = this.slService.ingredientsChanged.subscribe(
        //     (ingredients) => {
        //         this.ingredients$ = ingredients;
        //     }
        // );
    }
    
    onEditItem(id: number) {
        this.store.dispatch(slActions.START_EDIT({id: id}));
        // this.slService.startedEditing.next(id);
    }
    
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
