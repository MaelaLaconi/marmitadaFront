import { Injectable } from '@angular/core';
import {RecipeType} from "../../recipe/recipe.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CookbookService {

  private readonly _backendURL: any;
  private readonly _defautltRecipe: RecipeType;


  constructor(private _http: HttpClient) {
    this._defautltRecipe={
      name: 'nom',
      description: 'description',
      author: {
        pseudo: 'pseudo'
      },
      ingredients: [
        'some ingredient',
        'some ingredient',
        '100g de sucre',
        'some ingredient',
        'some ingredient',
        'some ingredient',
      ],
      steps: [
        'some step',
        'some step',
        'some step',
        'some step',
        'some step',

      ],
      difficulty: 3,
      preparationTime: 20,
      cookingTime: 0,
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Function to return list of recipe
   */
  fetch(): Observable<RecipeType[]>  {
    return this._http.get<RecipeType[]>(this._backendURL.allPeople)
      .pipe(
        filter((recipe: RecipeType[]) => !!recipe),
        defaultIfEmpty([])
      );
  }

}
