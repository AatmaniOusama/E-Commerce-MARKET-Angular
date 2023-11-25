import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: Product[];
  categories: string[];
  filteredProducts: Product[];
  loading: boolean = false;
  cartProduct: any[] = []

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.loading = true
    this.productService.getAllProducts().subscribe((product:any) => {
      this.products = product;
      this.loading = false
    },error => {
      alert(error.message)
      this.loading = false
    });
  }

  getCategories(){
    this.loading = true
    this.productService.getAllCategories().subscribe((category:any) => {
      this.categories = category
      this.loading = false
    })
  }

  filterCategory(event){
    this.loading = true
    let value = event.target.value;
    (value == 'all') ? this.getProducts() : this.getProductsCategory(value)
  }

  getProductsCategory(keyword: string){
    this.productService.getProductsByCategory(keyword).subscribe((product:any) => {
      this.products = product
      this.loading = false
    })
  }
  
  addToCart(event){
    if('cart' in localStorage){
      // Put items from LocalStorage to our variable
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!); // '!' To Skip Null case
      // variable exist may contains a duplicated product
      let exist = this.cartProduct.find(item => item.item.id == event.item.id);
      if(exist){
        this.itemExist(); 
      }else {
        // Update our variable by pushing a new product
        this.cartProduct.push(event);
        // Send the final 
        localStorage.setItem('cart', JSON.stringify(this.cartProduct));
      }
    } else {
      this.cartProduct.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    }
  }

  itemExist(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Item already in your cart !',
    })
  }
}