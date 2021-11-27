import { Component, OnInit } from '@angular/core';
import { RECEIPES} from "../_static/_receipes";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  private _receipt: any;
  constructor() {
    this._receipt = RECEIPES[0];
  }


  get receipt(): any {
    return this._receipt;
  }

  ngOnInit(): void {
  }

}
