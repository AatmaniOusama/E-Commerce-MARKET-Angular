import { Observable } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  id:string
  product: any;
  loading: boolean = false

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
   }

  

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
   
  }

}
