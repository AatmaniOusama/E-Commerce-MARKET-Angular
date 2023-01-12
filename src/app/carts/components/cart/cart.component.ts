import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: any;
  total: number

  constructor(private cartService: CartsService) { }

  ngOnInit(): void {
    this.getCartProduct();
  }

  getCartProduct(){
    if('cart' in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotal();
  }

  getTotal(){
    this.total = 0;
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++;
    this.getTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  minusAmount(index:number){
    this.cartProducts[index].quantity--;
    this.getTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  detectChange(){
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number){
    
    this.cartProducts.splice(index, 1)
    this.getTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  clearCart(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartProducts = [];
        this.getTotal();
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        Swal.fire(
          'Deleted!',
          'Your prosuct has been deleted.',
          'success'
        )
      }
    })
    
  }

  addCart(){
    let products = this.cartProducts.map(item => {
      return {productid: item.item.id, quantity: item.quantity}
    });
    let Model = {
      userid: 5,
      date: new Date(),
      products:products
    }
    this.cartService.createNewCart(Model);
  }
}