import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Recipe} from "../../recipe/recipe.type";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../recipe/author.type";

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
      id: new FormControl(),
      name: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(2)
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

    // this.addStep();
    // this.addIngredient();

    //
    // this._productForm.addControl('id', new FormControl());
    // this._productForm.addControl('name', new FormControl('', Validators.compose([
    //   Validators.required, Validators.minLength(2)
    // ])));
    // this._productForm.addControl('author', new FormGroup({
    //   pseudo: new FormControl('', Validators.compose([
    //       Validators.required, Validators.minLength(2)
    //     ])),
    //   firstname: new FormControl('', Validators.compose([
    //       Validators.required, Validators.minLength(2)
    //     ])),
    //   lastname: new FormControl('', Validators.compose([
    //     Validators.required, Validators.minLength(2)
    //   ]))
    // }));
    //
    // this._productForm.addControl('description', new FormControl('', Validators.compose([
    //   Validators.required, Validators.minLength(2)
    // ])));
    //
    // this._productForm.addControl('difficulty',new FormControl('', Validators.required));
    // this._productForm.addControl('cookingTime',new FormControl('', Validators.required));
    // this._productForm.addControl('preparationTime',new FormControl('', Validators.required));

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

  ingredientsArray(): Array<any>{
    const res = new Array<string>(this.steps.length);
    for (let i = 0; i < this.ingredients.length; i++) {
      res[i] = this.ingredients.at(i).get('ingredient')?.value;
    }
    return res;
  }

  stepsArray(): Array<string>{
    const res = new Array<string>(this.steps.length);
    for (let i = 0; i < this.steps.length; i++) {
      res[i] = this.steps.at(i).get('step')?.value;
    }
    return res;
  }

  get steps() : FormArray {
    return this._productForm.get("steps") as FormArray
  }

  newStep(): FormGroup {
    this._isAddedStep = true;
    return this._fb.group({
      step: '',
    })
  }

  addStep() {
    this.steps.push(this.newStep());
  }

  removeStep(i:number) {
    if(this.steps.length == 0){
      this._isAddedStep = false;
      this._productForm.removeControl('steps');

    }
    this.steps.removeAt(i);
  }

  get ingredients() : FormArray {
    // console.log(this._productForm.get('ingredients'));
    return this._productForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    this._isAddedIngr = true;
    return this._fb.group({
      ingredient: '',
    })
  }

  addIngredient() {
    this.ingredients.push(this.newIngredient());
  }

  removeIngredient(i:number) {
    if(this.ingredients.length==0){
      this._isAddedIngr = false;
      this._productForm.removeControl('ingredients');

    }
    this.ingredients.removeAt(i);
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

    // console.log("dans le submit + "+ Object.values(recipe.steps))
    const recipe1 : Recipe = {
      'id': recipe.id,
      'name': recipe.name,
      'category': recipe.category,
      'description': recipe.description,
      'author': this._getAuthor(recipe.author),
      'ingredients': this.ingredientsArray(),
      'steps': this.stepsArray()/*.map(value => value.step)*/,
      'difficulty': recipe.difficulty,
      'preparationTime': recipe.preparationTime,
      'cookingTime': recipe.cookingTime,
    };
    console.log(recipe1);
    this._submit$.emit(recipe1);
  }

  private _getAuthor(author: Author): Author {
    if(!!author.lastname && !!author.firstname) return author;
    return {pseudo: author.pseudo} as Author;
  }

  get productForm(): FormGroup {
    return this._productForm;
  }

  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      //console.log(this._model.steps);
      //console.log(this._model.ingredients);
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
