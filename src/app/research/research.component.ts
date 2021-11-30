import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe/recipe.type";
import {filter, mergeMap, tap} from "rxjs/operators";
import {CookbookService} from "../shared/services/cookbook.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
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
      filter((params: any) => !!params.name),
      mergeMap((params: any) => this._cookbookService.fetchByName(params.name)),
      tap(() => this._isRecipe = true)
    ).subscribe({ next: (recipe: Recipe[]) => this._recipes = recipe });
  }

}
