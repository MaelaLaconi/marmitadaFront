import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe/recipe.type";
import {CookbookService} from "../shared/services/cookbook.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private _recipes: Recipe[];
  constructor(private _cookbookService: CookbookService) {
    this._recipes = [];
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  ngOnInit(): void {
    this._cookbookService
      .fetchByCategory("salty")
      .subscribe({ next: (recipe: Recipe[]) => this._recipes = recipe });
  }

}
