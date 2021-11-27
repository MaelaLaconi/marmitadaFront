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
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Recipe>;
  // private property to store form value
  private readonly _form: FormGroup;
  constructor() {
    this._model = {} as Recipe;
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<Recipe>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }


  ngOnInit(): void {
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
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
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
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Recipe> {
    return this._submit$;
  }

  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        name: '',
        description: '',
        author: {
          pseudo: ''
        },
        ingredients: [
          '',
        ],
        steps: [
          '',
        ],
        difficulty: 0,
        preparationTime: 0,
        cookingTime: 0,
      };

      this._isUpdateMode = false;
    }

    // update form's values with model
    this._form.patchValue(this._model);
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(recipe: Recipe): void {
    this._submit$.emit(recipe);
  }



  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({

      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
     /* author: {
        pseudo: 'Giuseppe'
      },
      ingredients: [
        '3 oeufs',
        '250g de mascarponne',
        '100g de sucre',
        '20cl de café fort',
        '5cl d\'amaretto',
        '20 biscuit cuillères',
        '15g de cacao en poudre',
      ],
      steps: [
        'Préparer un café bien fort.',
        'Séparer les blancs des jaunes d\'oeufs.',
        'Réserver les blancs au réfrigérateur.',
        'Fouetter vivement le sucre aux jaunes d\'oeufs jusqu\'à obtenir un mélange blanchissant.',
        'Mélanger la mascarpone au mélange jaune d\'oeufs/sucre jusqu\'à obtenir un mélange homogène.',
        'Monter les blancs en neige ferme.',
        'Incorporer délicatement les blancs dans le mélange mascarpone/jaune d\'oeufs.',
        'Pour le montage, imbiber légérement les biscuits dans le café et disposer les sur le fond de votre moule.',
        'Recouvrir la première couche de biscuit avec la préparation à base de mascarponne.',
        'Répéter autant que nécessaire ou possible, et finir par une couche de préparation mascarponne.',
        'Laisser refroidir au réfrigérateur. Avant de servir saupoudrer de poudre de cacao.',
      ],

      */
      // forcement un nombre supérieur ou égal a 0
      difficulty: new FormControl('', Validators.compose([Validators.required,
          Validators.pattern(/^[0-9]\d*$/), Validators.min(1)
        ])),


      preparationTime: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(/^[0-9]\d*$/), Validators.min(1)
      ])),
      cookingTime: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(/^[0-9]\d*$/), Validators.min(1)
      ]))
    });
  }
}
