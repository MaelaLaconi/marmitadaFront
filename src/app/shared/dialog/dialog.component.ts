import {Component, Inject, OnInit, Optional} from '@angular/core';
import { Recipe} from "../types/recipe.type";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DialogComponent, Recipe>, @Optional() @Inject(MAT_DIALOG_DATA) private _recipe: Recipe) { }

  get recipe(): Recipe {
    return this._recipe;
  }

  ngOnInit(): void {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(recipe: Recipe): void {
    this._dialogRef.close(recipe);
  }
}
