import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "../shopping-list/shopping-edit/shopping-edit.component";
import {ShoppingListRoutingModule} from "../shopping-list/shopping-list-routing.module";
import {SharedModule} from "./shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule { }