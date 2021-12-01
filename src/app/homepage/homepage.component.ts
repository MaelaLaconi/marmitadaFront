import { Component, OnInit } from '@angular/core';
import {CookbookService} from "../shared/services/cookbook.service";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  //contains all the differents categories
  private _category : String[];
  private _options : String[];
  private _myControl = new FormControl();
  private _filteredOptions: Observable<String[]> | undefined;
  // value of reseach bar
  private _searchText: string;

  constructor(private _cookbookService: CookbookService) {
    this._category=[];
    this._options=[];
    this._searchText='';
  }


  set searchText(value: string) {
    this._searchText = value;
  }

  get searchText(): string {
    return this._searchText;
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

}
