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
  private _isAddedStep : boolean;
  private _isAddedIngr : boolean;

  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Recipe;

  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;

  private readonly _submit$: EventEmitter<Recipe>;


  constructor(private _fb:FormBuilder) {
    this._isAddedStep= false;
    this._isAddedIngr = false;

    //this._productForm = this._buildForm();
    this._productForm = this._fb.group({
      ingredients: this._fb.array([]) ,
      steps: this._fb.array([]),
    });

    this._productForm.addControl('id', new FormControl());
    this._productForm.addControl('name', new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));
    this._productForm.addControl('firstname', new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));
    this._productForm.addControl('lastname', new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));
    this._productForm.addControl('description', new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));
    this._productForm.addControl('pseudo', new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));

    this._productForm.addControl('difficulty',new FormControl('', Validators.required));
    this._productForm.addControl('cookingTime',new FormControl('', Validators.required));
    this._productForm.addControl('preparationTime',new FormControl('', Validators.required));
    this._cancel$ = new EventEmitter<void>();
    this._submit$ = new EventEmitter<Recipe>();
    this._model = {} as Recipe;
    this._isUpdateMode = false;
  }

  get isAddedIngr(): boolean {
    return this._isAddedIngr;
  }

  get isAddedStep(): boolean {
    return this._isAddedStep;
  }

  steps() : FormArray {
    return this._productForm.get("steps") as FormArray
  }

  newStep(): FormGroup {
    this._isAddedStep = true;
    console.log("dans le new step "+this._isAddedStep)

    this._productForm.addControl('steps',new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));
    return this._fb.group({
      step: '',

    })
  }

  addStep() {
    this.steps().push(this.newStep());
    console.log(this._productForm.value);

  }

  removeStep(i:number) {
    if(this.steps().length == 0){
      this._isAddedStep = false;
      console.log("dans le remove "+this._isAddedStep)
      this._productForm.removeControl('steps');

    }
    this.steps().removeAt(i);
  }

  ingredients() : FormArray {
    return this._productForm.get("ingredients") as FormArray
  }



  newIngredient(): FormGroup {
    this._isAddedIngr = true;
    console.log("dans le new ingredient "+this._isAddedIngr)

    this._productForm.addControl('ingredients',new FormControl('', Validators.compose([
      Validators.required, Validators.minLength(2)
    ])));
    return this._fb.group({
      ingredients: '',

    })
  }

  addIngredient() {
    console.log("dans le aaaaaaaaaaaadd")
    this.ingredients().push(this.newIngredient());
  }


  removeIngredient(i:number) {
    if(this.ingredients().length==0){
      this._isAddedIngr = false;
      this._productForm.removeControl('ingredients');

    }
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
  submit(recipe: Recipe): void {
    console.log(this._productForm.value);
    this._submit$.emit(recipe);
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
