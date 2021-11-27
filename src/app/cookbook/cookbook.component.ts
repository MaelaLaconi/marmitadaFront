import { Component, OnInit } from '@angular/core';
import {RECEIPES} from "../_static/_receipes";
import {ReceiptType} from "../receipt/receipt.type";

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  //private _cookbook: ReceiptType[];
  constructor() {
    //this._cookbook=[];
  }

  ngOnInit(): void {
  }

}
