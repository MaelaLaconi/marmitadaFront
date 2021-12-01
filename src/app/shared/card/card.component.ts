import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../types/recipe.type";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // private property to store recipe value
  private _recipe: Recipe;

  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Recipe>;

  constructor() {
    this._recipe = {} as Recipe;
    this._delete$ = new EventEmitter<Recipe>();
  }

  ngOnInit(): void {
  }

  /**
   * get our recipe
   */
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

  /**
   * Returns private property _delete$
   */
  @Output('deleteRecipe') get delete$(): EventEmitter<Recipe> {
    return this._delete$;
  }

  /**
   * Function to emit event to delete current recipe
   */
  delete(recipe: Recipe): void {
    this._delete$.emit(recipe);
  }
}
