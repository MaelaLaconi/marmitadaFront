import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Recipe} from "../../recipe/recipe.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;

  private readonly _add$: EventEmitter<Recipe>;

// private property to store entity
  private readonly _entity: string;

  constructor() {
    this._entity = 'LMFI';
    this._cancel$ = new EventEmitter<void>();
    this._add$ = new EventEmitter<Recipe>();
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel') get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }

  /**
   * Returns private property _add$
   */
  @Output('addRecipe') get add$(): EventEmitter<any> {
    return this._add$;
  }

  /**
   * Returns private property _entity
   */
  get entity(): string {
    return this._entity;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to add new recipe
   */
  add(recipe: Recipe): void {
    this._add$.emit(recipe);
  }
}
