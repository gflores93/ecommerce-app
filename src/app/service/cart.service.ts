import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  //pass a value and emmit so someone can subscribe to it
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  /* 
  the subscrition is done to this method, and on every .next done to productList 
  the subscribers would receive the new value of cartItemList
  */
  getProducts() {
    return this.productList.asObservable();
  }

  // Include new data and pass the cartItemList emitting the observable, so the subscribers can see the changes
  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    console.log(this.cartItemList);
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
}
