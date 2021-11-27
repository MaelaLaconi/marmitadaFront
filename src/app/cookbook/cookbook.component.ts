import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {RecipeType} from "../recipe/recipe.type";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  private _cookbook: RecipeType[];
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._cookbook=[];
    this._backendURL=[];

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  ngOnInit(): void {
    this._http.get<RecipeType[]>(this._backendURL.allRecipe)
      .subscribe({ next: (recipe: RecipeType[]) => this._cookbook = recipe });
  }


  get cookbook(): RecipeType[] {
    return this._cookbook;
  }
}
