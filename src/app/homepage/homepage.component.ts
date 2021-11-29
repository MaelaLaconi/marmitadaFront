import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private _category : string[];
  constructor() {
    this._category=["salty", "sweet"];
  }

  get category(): string[] {
    return this._category;
  }

  ngOnInit(): void {
  }

}
