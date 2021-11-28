import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Recipe} from "../../recipe/recipe.type";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  private _productForm: FormGroup;


  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Recipe;

  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;

  private readonly _submit$: EventEmitter<Recipe>;


  constructor(private _fb:FormBuilder) {
    /*this._productForm = this._fb.group({
      ingredients: this._fb.array([]) ,
      steps: this._fb.array([]),
    });*/

    this._productForm = this._buildForm();

    this._cancel$ = new EventEmitter<void>();
    this._submit$ = new EventEmitter<Recipe>();
    this._model = {} as Recipe;
    this._isUpdateMode = false;
  }

  steps() : FormArray {
    return this._productForm.get("steps") as FormArray
  }

  newStep(): FormGroup {
    return this._fb.group({
      step: '',

    })
  }

  addStep() {
    this.steps().push(this.newStep());
  }

  removeStep(i:number) {
    this.steps().removeAt(i);
  }

  ingredients() : FormArray {
    return this._productForm.get("ingredients") as FormArray
  }

  newIngredient(): FormGroup {
    return this._fb.group({
      ingr: '',

    })
  }


  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }

  removeIngredient(i:number) {
    this.ingredients().removeAt(i);
  }

  /**
   *
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
    console.log(this._productForm.value);
    this._submit$.emit(this._model);
  }


  get productForm(): FormGroup {
    return this._productForm;
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

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      firstname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      pseudo: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      ingredients: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      steps: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      difficulty: new FormControl('', Validators.required),
      cookingTime: new FormControl('', Validators.required),
      preparationTime: new FormControl('', Validators.required),

    });
  }
}
