import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../../shared/recipe.model';
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe!: Recipe;
  @Input() id!: number;
  
  constructor() { }

  ngOnInit() {
  }
}
