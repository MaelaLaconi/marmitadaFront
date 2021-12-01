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

  private _isCookbook : boolean;
  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Recipe>;

  constructor() {
    this._recipe = {} as Recipe;
    this._delete$ = new EventEmitter<Recipe>();
    this._isCookbook = false;
  }

  ngOnInit(): void {
  }

  /**
   * true if it's a cookbook display, false otherwise
   */
  get isCookbook(): boolean {
    return this._isCookbook;
  }

  /**
   * get our recipe
   */
  get recipe(): Recipe {
    return this._recipe;
  }

  /**
   * set the value of isCookbook
   * @param value
   */
  @Input()
  set isCookbook(value: boolean) {
    this._isCookbook = value;
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
