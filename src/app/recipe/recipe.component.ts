import { Component, OnInit } from '@angular/core';
import {filter, mergeMap, tap} from "rxjs/operators";
import {CookbookService} from "../shared/services/cookbook.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../shared/types/recipe.type";
import {merge} from "rxjs";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  private _recipe: any;
  private _isRecipe;
  constructor(private _cookbookService: CookbookService, private _route: ActivatedRoute) {
    this._recipe = {} as Recipe;
    this._isRecipe=false;
  }

  get isRecipe() {
    return this._isRecipe;
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._cookbookService.fetchOne(params.id)),
        tap(() => this._isRecipe = true)
      ),
      this._route.params.pipe(
        filter((params: any) => !params.id),
        mergeMap(() => this._cookbookService.fetchRandom()),
        tap(() => this._isRecipe = false)
      )
    )
      .subscribe({
        next: (recipe: Recipe) => this._recipe = recipe,
        error: () => {
          // manage error when user doesn't exist in DB
          this._recipe = this._cookbookService.defautltRecipe;
          this._isRecipe = true;
        }
      });
  }

  get recipe(): any {
    return this._recipe;
  }
}
