import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal : number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.products = res;
      //toDo: group items of the same id and get the quantity and adjust total(price*quantity)
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  // toDo: modify quantity - add or remove
}
