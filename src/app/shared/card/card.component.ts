import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe/recipe.type";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  //private property to store recipe value
  private _recipe: Recipe;

  constructor() {
    this._recipe = {} as Recipe;
  }

  ngOnInit(): void {
  }


  get recipe(): Recipe {
    return this._recipe;
  }

  /**
   * Sets private property _recipe
   */
  @Input()
  set recipe(recipe: Recipe) {
    this._recipe = recipe;
  }

}
