import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe/recipe.type";
import {CookbookService} from "../shared/services/cookbook.service";


@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  private _cookbook: Recipe[];
  private readonly _backendURL: any;

  constructor(private _cookbookService: CookbookService) {
    this._cookbook=[];
    this._backendURL=[];
    }

  ngOnInit(): void {
    this._cookbookService
      .fetch()
      .subscribe({ next: (recipe: Recipe[]) => this._cookbook = recipe });
  }

  get cookbook(): Recipe[] {
    return this._cookbook;
  }
}





