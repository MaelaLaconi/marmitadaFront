import { Component, OnInit } from '@angular/core';
import {Recipe} from "../shared/types/recipe.type";
import {CookbookService} from "../shared/services/cookbook.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import {filter, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  private _cookbook: Recipe[];

  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _cookbookDialog: MatDialogRef<DialogComponent, Recipe> | undefined;

  private _view: string; //pour plus tard si on veut switch de vue
  constructor(private _cookbookService: CookbookService, private _dialog: MatDialog) {
    this._cookbook=[];
    this._dialogStatus = 'inactive';
    this._view= 'list';
    }

  ngOnInit(): void {
    this._cookbookService
      .fetch()
      .subscribe({ next: (recipe: Recipe[]) => this._cookbook = recipe });
  }

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


  get view(): string {
    return this._view;
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
        mergeMap((recipe: Recipe | undefined) => this._add(recipe))
      )
      .subscribe({
        next: (recipe: Recipe) => this._cookbook = this._cookbook.concat(recipe),
        error: () => this._dialogStatus = 'inactive',
        complete: () => this._dialogStatus = 'inactive'
      });
  }


  /**
   * Add new person
   */
  private _add(recipe: Recipe | undefined): Observable<Recipe> {
    return this._cookbookService.create(recipe as Recipe);
  }
}





