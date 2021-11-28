import { Component, OnInit } from '@angular/core';
import {RECIPES} from "../_static/_recipes";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  private _recipe: any;

  constructor() {
    this._recipe = RECIPES[0];
  }

  ngOnInit(): void {

  }

  get recipe(): any {
    return this._recipe;
  }
}
