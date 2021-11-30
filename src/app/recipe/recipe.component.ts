import { Component, OnInit } from '@angular/core';
import {filter, mergeMap, tap} from "rxjs/operators";
import {CookbookService} from "../shared/services/cookbook.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../shared/types/recipe.type";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  private _recipe: any;
  private _isRecipe;
  constructor(private _recipeService: CookbookService, private _route: ActivatedRoute) {
    this._recipe = {} as Recipe;
    this._isRecipe=false;
  }

  get isRecipe() {
    return this._isRecipe;
  }

  ngOnInit(): void {
    this._route.params.pipe(
      filter((params: any) => !params.id),
      mergeMap(() => this._recipeService.fetchRandom()),
      tap(() => this._isRecipe = false)
    )
      .subscribe({
        next: (recipe: Recipe) => this._recipe = recipe,
        error: () => {
          // manage error when user doesn't exist in DB
          this._recipe = this._recipeService.defautltRecipe;
          this._isRecipe = true;
        }
      });
  }

  get recipe(): any {
    return this._recipe;
  }
}
