import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public cartSubscription!: Subscription;
  public products: any = [];
  public grandTotal: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {

    this.cartSubscription = this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }

  // unsubscribe every changing screen 
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  // toDo: modify quantity - add or remove
  updateQuantity(event: any, item: any) {
    console.log('input field: ', event.target.value);
    let value = isNaN(event?.target?.value) || event?.target?.value <= 0 ? 1 : parseFloat(event?.target?.value);
    event.target.value = value;
    console.log('value: ', value);
    this.cartService.updatetQuantity(item, value);
  }

}
