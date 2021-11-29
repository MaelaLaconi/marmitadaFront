import { Component, OnInit } from '@angular/core';
import {CookbookService} from "../shared/services/cookbook.service";
import {Recipe} from "../recipe/recipe.type";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private _category : String[];
  constructor(private _cookbookService: CookbookService) {
    this._category=[];
  }

  get category(): String[] {
    return this._category;
  }

  ngOnInit(): void {
    this._cookbookService
      .fetchAllCategory()
      .subscribe({ next: (recipe: String[]) => this._category = recipe });
  }

}
