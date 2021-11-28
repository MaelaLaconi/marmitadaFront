import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Recipe} from "../../recipe/recipe.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {


  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Recipe;

  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;

  private readonly _submit$: EventEmitter<Recipe>;


  constructor() {
    this._cancel$ = new EventEmitter<void>();
    this._submit$ = new EventEmitter<Recipe>();
    this._model = {} as Recipe;
    this._isUpdateMode = false;
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Recipe) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Recipe {
    return this._model;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel') get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _add$
   */
  @Output('submit') get submit$(): EventEmitter<Recipe> {
    return this._submit$;
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
   * Function to emit event to submit form and recipe
   */
  submit(): void {
    this._submit$.emit(this._model);
  }


  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        id: '',
        name: '',
        description: '',
        author: {
          pseudo: '',
        },
        ingredients: [],
        steps: [],
        difficulty: 0,
        preparationTime: 0,
        cookingTime: 0
      };
      this._isUpdateMode = false;
    }
  }

}
