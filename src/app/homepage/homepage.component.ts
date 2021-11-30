import { Component, OnInit } from '@angular/core';
import {CookbookService} from "../shared/services/cookbook.service";
import {Recipe} from "../recipe/recipe.type";
import {FormControl} from "@angular/forms";
import {filter, map, mergeMap, startWith, tap} from "rxjs/operators";
import {Observable, pipe} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private _category : String[];
  private _options : String[];
  private _myControl = new FormControl();
  private _filteredOptions: Observable<String[]> | undefined;
  private _recipes: Recipe[];

  constructor(private _cookbookService: CookbookService) {
    this._category=[];
    this._options=[];
    this._recipes=[];
  }

  get options(): String[] {
    return this._options;
  }

  get category(): String[] {
    return this._category;
  }

  get myControl(): FormControl {
    return this._myControl;
  }


  get filteredOptions(): Observable<String[]> | undefined {
    return this._filteredOptions;
  }

  ngOnInit(): void {
    this._cookbookService
      .fetchAllCategory()
      .subscribe({ next: (recipe: String[]) => this._category = recipe });


    this._cookbookService
      .fetchAllNames()
      .subscribe({ next: (recipe: String[]) => this._options = recipe });

    this._filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this._options.filter(option => option.toLowerCase().includes(filterValue));
  }




  get recipes(): Recipe[] {
    return this._recipes;
  }
}
