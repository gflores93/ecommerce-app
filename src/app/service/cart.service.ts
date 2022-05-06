import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  //pass a value and emmit so someone can subscribe to it
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  public alert: any = {
    msg: '',
    type: 0
  };

  constructor() { }

  /* 
  the subscrition is done to this method, and on every .next done to productList 
  the subscribers would receive the new value of cartItemList
  */
  getProducts() {
    return this.productList.asObservable();
  }

  // Include new data and pass the cartItemList emitting the observable, so the subscribers can see the changes
  addToCart(product: any): any {
    if (this.cartItemList.some((e: any) => e.id === product.id)) {
      this.alert.msg = 'Item already included in the cart';
      this.alert.type = 2; // Already there 
    }
    else {
      this.cartItemList.push(product);
      this.alert.msg = 'Item included to the cart!';
      this.alert.type = 1; // Inserted 
    }
    this.productList.next(this.cartItemList);
    // console.log(this.cartItemList);
    return this.alert;
  }

  getTotalPrice(): number {
    let grandTotal = this.cartItemList.reduce((partialSum: number, a: any) => partialSum + a.total, 0);
    return Math.round(grandTotal * 100) / 100;
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((a: any) => a.id != product.id);
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  incrementQuantity(item: any) {
    item.quantity++;
    item.total = Math.round(item.quantity * item.price * 100) / 100; 
  }

  decreaseQuantity(item: any) {
    if(item.quantity > 1) {
      item.quantity--;
      item.total = Math.round(item.quantity * item.price * 100) / 100; 
    }
  }
}
