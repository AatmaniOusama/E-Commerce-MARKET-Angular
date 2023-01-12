import { Product } from './../../models/Product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() data: Product ;

  @Output() item = new EventEmitter()

  status: boolean = false;
  amount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  showQuantityForm(){
    this.status = !this.status;
  }

  add(){
    this.item.emit({item: this.data, quantity: this.amount});
  }
}