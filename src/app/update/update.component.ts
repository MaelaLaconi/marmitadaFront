import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {Recipe} from "../shared/types/recipe.type";
import {ActivatedRoute, Router} from "@angular/router";
import {CookbookService} from "../shared/services/cookbook.service";
import {filter, map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private _cookbookDialog: MatDialogRef<DialogComponent, Recipe> | undefined;

  constructor(private _route: ActivatedRoute, private _router: Router, private _cookbookService: CookbookService, private _dialog: MatDialog) { }

  /**
   * init with the recipe to update (in the modal)
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._cookbookService.fetchOne(id))
      )
      .subscribe((recipe: Recipe) => this._initModal(recipe));
  }

  /**
   * Initialize modal process
   */
  private _initModal(recipe: Recipe): void {
    // create modal with initial data inside
    this._cookbookDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: recipe
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._cookbookDialog.afterClosed()
      .pipe(
        filter((recipe: Recipe | undefined) => !!recipe),
        map((recipe: Recipe | undefined) => {
          // get recipe id
          const id = recipe?.id;
          // delete obsolete attribute in original object which are not required in the API
          delete recipe?.id;
          return { id, update: recipe };
        }),
        mergeMap((_: { id: any, update: any }) => this._cookbookService.update(_.id, _.update))
      )
      .subscribe({
          error: () => this._router.navigate(['/cookbook']),
          complete: () => this._router.navigate(['/cookbook'])
        }
      );
  }
}
