import { Injectable } from '@angular/core';
import {Recipe} from "../types/recipe.type";
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
      category: 'salty',
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

  /**
   * Function to return list of recipe by category
   */
  fetchByName(name: string): Observable<Recipe[]>  {
    return this._http.get<Recipe[]>(this._backendURL.allRecipeName.replace(':name', name))
      .pipe(
        filter((recipes: Recipe[]) => !!recipes),
        defaultIfEmpty([] as Recipe[])
      );
  }

  /**
   * Function to return list of string category
   */
  fetchAllCategory(): Observable<String[]>  {
    return this._http.get<String[]>(this._backendURL.allCateg)
      .pipe(
        filter((recipes: String[]) => !!recipes),
        defaultIfEmpty([] as String[])
      );
  }
  /**
   * Function to return list of recipe by category
   */
  fetchAllNames(): Observable<String[]>  {
    return this._http.get<String[]>(this._backendURL.allNames)
      .pipe(
        filter((recipes: String[]) => !!recipes),
        defaultIfEmpty([] as String[])
      );
  }

  /**
   * Function to return list of string category
   */
  fetchWithSort(methode: string): Observable<Recipe[]>  {
    return this._http.get<Recipe[]>(this._backendURL.tri.replace(':sortMethod', methode))
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

  /**
   * Function to return one random person from people list
   */
  fetchRandom(): Observable<Recipe> {
    return this._http.get<Recipe>(this._backendURL.randomRecipe)
      .pipe(
        filter((recipe: Recipe) => !!recipe),
        defaultIfEmpty(this._defautltRecipe)
      );
  }

}
