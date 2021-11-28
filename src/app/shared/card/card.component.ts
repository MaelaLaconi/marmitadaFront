import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipe/recipe.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fiche',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class FicheComponent implements OnInit {

  private _recipe: Recipe;
  private readonly _delete$: EventEmitter<Recipe>;


  constructor(private _router: Router) {
    this._recipe = {} as Recipe;
    this._delete$ = new EventEmitter<Recipe>();
  }


  get recipe(): Recipe {
    return this._recipe;
  }

  @Input()
  set recipe(recipe:Recipe){
    this._recipe = recipe;
  }

  @Output('deleteRecipe') get delete$(): EventEmitter<Recipe>{
    return this._delete$;
  }

  delete(recipe: Recipe): void{
    this._delete$.emit(recipe);
  }

  ngOnInit(): void {
  }

}
