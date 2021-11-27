import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {RecipeType} from "../recipe/recipe.type";
import {HttpClient} from "@angular/common/http";
import {CookbookService} from "../shared/services/cookbook.service";


@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  private _cookbook: RecipeType[];
  private readonly _backendURL: any;

  constructor(private _cookbookService: CookbookService) {
    this._cookbook=[];
    this._backendURL=[];
    }

  ngOnInit(): void {
    this._cookbookService
      .fetch()
      .subscribe({ next: (recipe: RecipeType[]) => this._cookbook = recipe });
  }

  get cookbook(): RecipeType[] {
    return this._cookbook;
  }
}





