import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe/recipe.type";
import {CookbookService} from "../shared/services/cookbook.service";
import {ActivatedRoute} from "@angular/router";
import {filter, mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private _recipes: Recipe[];
  private _isRecipe: boolean;
  constructor(private _cookbookService: CookbookService, private _route: ActivatedRoute) {
    this._recipes = [];
    this._isRecipe = false;

  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  ngOnInit(): void {
    this._route.params.pipe(
      filter((params: any) => !!params.id),
      mergeMap((params: any) => this._cookbookService.fetchByCategory(params.id)),
      tap(() => this._isRecipe = true)
    ).subscribe({ next: (recipe: Recipe[]) => this._recipes = recipe });
  }

}
