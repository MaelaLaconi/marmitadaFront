import { Component, OnInit } from '@angular/core';
import {RECIPES} from "../_static/_recipes";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  private _receipt: any;

  constructor() {
    this._receipt = RECIPES[0];
  }

  ngOnInit(): void {
  }

  get receipt(): any {
    return this._receipt;
  }
}
