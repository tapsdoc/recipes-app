import {NgModule} from "@angular/core";
import {AlertComponent} from "../shared/alert/arlet.component";
import {DropdownDirective} from "../shared/dropdown.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        DropdownDirective,
        AlertComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ]
})
export class SharedModule { }