import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Recipe} from "../types/recipe.type";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Author} from "../types/author.type";
import {CustomValidators} from "./custom-validators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  // private property to store form value
  private readonly _productForm: FormGroup;
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Recipe;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Recipe>;
  // private property to store if we need to show the steps input of recipe
  private _isAddedStep : boolean;
  // private property to store if we need to show the ingredients input of the recipe
  private _isAddedIngr : boolean;

  constructor(private _fb:FormBuilder) {
    this._isAddedStep= false;
    this._isAddedIngr = false;
    this._productForm = this._buildForm();
    this._cancel$ = new EventEmitter<void>();
    this._submit$ = new EventEmitter<Recipe>();
    this._model = {} as Recipe;
    this._isUpdateMode = false;
  }

  // Gestion des ingrédients //

  /**
   * Getter of _isAddedIngr
   * @return {boolean} _isAddedIngr
   */
  get isAddedIngr(): boolean {
    return this._isAddedIngr;
  }

  /**
   * Getter of the 'ingredients FormArray in the _productForm FormGroup
   * @return {FormArray} this._productForm.get('ingredients')
   */
  get ingredients() : FormArray {
    return this._productForm.get('ingredients') as FormArray;
  }

  /**
   * Return the ingredients FormArray values in a simple Array
   * @return {Array<string>} array with the ingredients values
   */
  ingredientsArray(): Array<string>{
    const res = new Array<string>(this.ingredients.length);
    for (let i = 0; i < this.ingredients.length; i++) {
      res[i] = this.ingredients.at(i).get('ingredient')?.value;
    }
    return res;
  }

  /**
   * Create a new FormGroup to add an ingredient
   * Set the _isAddedIngr value to true.
   * @return {FormGroup} this._fb.group({ingredient: '',})
   */
  newIngredient(): FormGroup {
    this._isAddedIngr = true;
    return this._fb.group({
      ingredient: '',
    })
  }

  /**
   * Add a new ingredient to the ingredients FormArray
   */
  addIngredient() {
    this.ingredients.push(this.newIngredient());
  }

  /**
   * Remove the ingredient at index i from the FormArray
   * @param {number} i index of the ingredient to remove
   */
  removeIngredient(i:number) {
    if(this.ingredients.length==0){
      this._isAddedIngr = false;
      this._productForm.removeControl('ingredients');
    }
    this.ingredients.removeAt(i);
  }

  // Gestion des étapes //

  /**
   * Getter of _isAddedStep
   * @return {boolean} this._isAddedStep
  */
  get isAddedStep(): boolean {
    return this._isAddedStep;
  }

  /**
   * Getter of the 'steps' FormArray in the _productForm FormGroup
   * @return {FormArray} this._productForm.get('steps')
   */
  get steps() : FormArray {
    return this._productForm.get("steps") as FormArray
  }

  /**
   * Return the steps FormArray values in a simple Array
   * @return {Array<string>} array with the steps values
   */
  stepsArray(): Array<string>{
    const res = new Array<string>(this.steps.length);
    for (let i = 0; i < this.steps.length; i++) {
      res[i] = this.steps.at(i).get('step')?.value;
    }
    return res;
  }

  /**
   * Create a new FormGroup to add a step
   * Set the _isAddedStep value to true.
   * @return {FormGroup} this._fb.group({step: '',})
   */
  newStep(): FormGroup {
    this._isAddedStep = true;
    return this._fb.group({
      step: '',
    })
  }

  /**
   * Add a new step to the steps FormArray
   */
  addStep() {
    this.steps.push(this.newStep());
  }

  /**
   * Remove the step at index i from the FormArray
   * @param {number} i index of the step to remove
   */
  removeStep(i:number) {
    if(this.steps.length == 0){
      this._isAddedStep = false;
      this._productForm.removeControl('steps');

    }
    this.steps.removeAt(i);
  }

  // Gestion du formulaire //

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
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Returns private property _add$
   */
  @Output('submit') get submit$(): EventEmitter<Recipe> {
    return this._submit$;
  }

  /**
   * Function to emit event to submit form and recipe
   */
  submit(recipe: Recipe): void {
    const recipe1 : Recipe = {
      'id': recipe.id,
      'name': recipe.name,
      'category': recipe.category,
      'description': recipe.description,
      'author': this._getAuthor(recipe.author),
      'ingredients': this.ingredientsArray(),
      'steps': this.stepsArray(),
      'difficulty': recipe.difficulty,
      'preparationTime': recipe.preparationTime,
      'cookingTime': recipe.cookingTime,
    };
    console.log(recipe1);
    this._submit$.emit(recipe1);
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {

  }

  /**
   * Function to handle component update
   * @param record the data with the changed values
   */
  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        id: '',
        name: '',
        category: '',
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

    this._model.ingredients.forEach((value) => {
      this._isAddedIngr = true;
      this.ingredients.push(
        this._fb.group({
            ingredient: value,
          }
        ));
    });
    this._model.steps.forEach((value) => {
      this._isAddedStep = true;
      this.steps.push(
        this._fb.group({
            step: value,
          }
        ));
    });
    this._productForm.patchValue(this._model);
  }

  /**
   * Return a valid author object.
   * If the firstname or the lastname is incomplete, the author object will only have a pseudo.
   * @param {Author} author to verify
   * @private
   */
  private _getAuthor(author: Author): Author {
    if(!!author.lastname && !!author.firstname) return author;
    return {pseudo: author.pseudo} as Author;
  }

  /**
   * Getter for the FormGroup containing all the data
   * @return {FormGroup} this._productForm
   */
  get productForm(): FormGroup {
    return this._productForm;
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2),
        CustomValidators.firstLetterUpper
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      category: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      author: new FormGroup({
        pseudo: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(2)
        ])),
        firstname: new FormControl('', Validators.compose([
          Validators.minLength(2)
        ])),
        lastname: new FormControl('', Validators.compose([
          Validators.minLength(2)
        ]))
      }),
      ingredients: this._fb.array([]),
      steps: this._fb.array([]),
      difficulty: new FormControl('', Validators.required),
      cookingTime: new FormControl('', Validators.required),
      preparationTime: new FormControl('', Validators.required),
    });
  }
}
