import { Injectable } from '@angular/core';
import {Recipe} from "../../recipe/recipe.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CookbookService {

  private readonly _backendURL: any;
  private readonly _defautltRecipe: Recipe;

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
  fetch(): Observable<Recipe[]>  {
    return this._http.get<Recipe[]>(this._backendURL.allRecipe)
      .pipe(
        filter((recipes: Recipe[]) => !!recipes),
        defaultIfEmpty([] as Recipe[])
      );
  }

  /**
   * Function to return one recipe for current id
   */
  fetchOne(id: string): Observable<Recipe> {
    return this._http.get<Recipe>(this._backendURL.oneRecipe.replace(':id', id));
  }


  /**
   * Function to return list of recipe by category
   */
  fetchByCategory(category: string): Observable<Recipe[]>  {
    return this._http.get<Recipe[]>(this._backendURL.allRecipeCat.replace(':category', category))
      .pipe(
        filter((recipes: Recipe[]) => !!recipes),
        defaultIfEmpty([] as Recipe[])
      );
  }


  get defautltRecipe(): Recipe {
    return this._defautltRecipe;
  }

  /**
   * Function to create a new recipe
   */
  create(recipe: Recipe): Observable<any> {
    console.log("dans create"+ recipe.name);
    console.log("dans create"+ recipe.description);
    console.log("dans create"+ recipe.author.pseudo);
    console.log("dans create"+ recipe.author.firstname);
    console.log("dans create"+ recipe.author.lastname);
    console.log("dans create"+ recipe.ingredients[0]);
    console.log("dans create"+ recipe.steps[0]);
    console.log("dans create"+ recipe.difficulty);
    console.log("dans create"+ recipe.preparationTime);
    console.log("dans create"+ recipe.cookingTime);
    console.log("dans create"+ recipe.id);
    console.log("JSON.stringify(obj)"+ JSON.stringify(recipe.steps[0]));


    return this._http.post<Recipe>(this._backendURL.allRecipe, recipe, this._options());
  }

  /**
   * Function to update one recipe
   */
  update(id: string, recipe: Recipe): Observable<any> {
    return this._http.put<Recipe>(this._backendURL.oneRecipe.replace(':id', id), recipe, this._options());
  }

  /**
   * Function to delete one recipe for current id
   */
  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneRecipe.replace(':id', id))
      .pipe(
        map(() => id)
      );
  }
  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

}
