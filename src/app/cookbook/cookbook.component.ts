import { Component, OnInit } from '@angular/core';
import {Recipe} from "../shared/types/recipe.type";
import {CookbookService} from "../shared/services/cookbook.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import {filter, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  //contains all our recipes
  private _cookbook: Recipe[];
  // asc or desc sort
  private _sortValue: string;
  // active or inactive status
  private _dialogStatus: string;
  // our dialog
  private _cookbookDialog: MatDialogRef<DialogComponent, Recipe> | undefined;
  //boolean for the slide toggle (sort)
  isChecked = false;

  constructor(private _cookbookService: CookbookService, private _dialog: MatDialog) {
    this._cookbook=[];
    this._dialogStatus = 'inactive';
    this._sortValue='name';
  }

  get sortOrder() {
    return this.isChecked ? 'décroissant' : 'croissant';
  }

  /**
   * fetch all the recipes
   */
  ngOnInit(): void {
    this._cookbookService
      .fetch()
      .subscribe({ next: (recipe: Recipe[]) => this._cookbook = recipe });
  }

  /**
   * get all the recipes
   */
  get cookbook(): Recipe[] {
    return this._cookbook;
  }

  /**
   * Function to delete one recipe
   */
  delete(recipe: Recipe): void {
    this._cookbookService
      .delete(recipe.id as string)
      .subscribe((id: string) => this._cookbook = this._cookbook.filter((r: Recipe) => r.id !== id));
  }

  /**
   * Function to sort all the recipe
   */
  sortByElem(elem: string): void {
    this.isChecked ? this._sortValue='-'+elem: this._sortValue=elem;
    this._cookbookService
      .fetchWithSort(this._sortValue)
      .subscribe({ next: (recipe: Recipe[]) => this._cookbook = recipe });
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  showDialog(): void {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._cookbookDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });
    // subscribe to afterClosed observable to set dialog status and do process
    this._cookbookDialog.afterClosed()
      .pipe(
        filter((recipe: Recipe | undefined) => !!recipe),
        map( (recipe: Recipe | undefined) => {
          // delete obsolete attribute in original object which is not required in the API
          delete recipe?.id;
          return recipe;
        }),
        mergeMap((recipe: Recipe | undefined) => this._add(recipe))
      )
      .subscribe({
        next: (recipe: Recipe) => this._cookbook = this._cookbook.concat(recipe),
        error: () => this._dialogStatus = 'inactive',
        complete: () => this._dialogStatus = 'inactive'
      });
  }

  /**
   * Add new recipe to the cookbook
   */
  private _add(recipe: Recipe | undefined): Observable<Recipe> {
    return this._cookbookService.create(recipe as Recipe);
  }
}





