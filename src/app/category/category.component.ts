import { Component, OnInit } from '@angular/core';
import {Recipe} from "../shared/types/recipe.type";
import {CookbookService} from "../shared/services/cookbook.service";
import {ActivatedRoute} from "@angular/router";
import {filter, mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // contains our recipes filter by category
  private _recipes: Recipe[];
  //check if it's a recipe or not
  private _isRecipe: boolean;
  constructor(private _cookbookService: CookbookService, private _route: ActivatedRoute) {
    this._recipes = [];
    this._isRecipe = false;
  }

  /**
   * get all the recipes filter by one category
   */
  get recipes(): Recipe[] {
    return this._recipes;
  }

  /**
   * fetch recipes by category on init
   */
  ngOnInit(): void {
   this._route.params.pipe(
      filter((params: any) => !!params.category),
      mergeMap((params: any) => this._cookbookService.fetchByCategory(params.category)),
      tap(() => this._isRecipe = true)
    ).subscribe({ next: (recipe: Recipe[]) => this._recipes = recipe });
  }

}
