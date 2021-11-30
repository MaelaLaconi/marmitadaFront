import { Component, OnInit } from '@angular/core';
import {Recipe} from "../shared/types/recipe.type";
import {filter, map, mergeMap, tap} from "rxjs/operators";
import {CookbookService} from "../shared/services/cookbook.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  private _recipes: Recipe[];
  private _isRecipe: boolean;
  private _dialogStatus: string;
  private _recipeDialog: MatDialogRef<DialogComponent, Recipe> | undefined;

  constructor(private _cookbookService: CookbookService, private _route: ActivatedRoute, private _dialog: MatDialog) {
    this._recipes = [];
    this._isRecipe = false;
    this._dialogStatus = 'inactive';

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

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Function to display modal
   */
  showDialog(): void {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._recipeDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._recipeDialog.afterClosed()
      .pipe(
        filter((recipe: Recipe | undefined) => !!recipe),
        map((recipe: Recipe | undefined) => {
          // delete obsolete attributes in original object which are not required in the API
          delete recipe?.id;

          return recipe;
        }),
        mergeMap((recipe: Recipe | undefined) => this._add(recipe))
      )
      .subscribe({
        next: (recipe: Recipe) => this._recipes = this._recipes.concat(recipe),
        error: () => this._dialogStatus = 'inactive',
        complete: () => this._dialogStatus = 'inactive'
      });
  }

  /**
   * Add new recipe
   */
  private _add(recipe: Recipe | undefined): Observable<Recipe> {
    return this._cookbookService.create(recipe as Recipe);
  }
}
