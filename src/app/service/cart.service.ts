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

  getProducts() {
    return this.productList.asObservable();
  }

  // not used 
  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }

  // Include new data and pass the cart list emitting the observable, so the subscribers can see the change
  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  //ToDo: use the total, right now it is only assigned in the scope of the method but not used nor passed
  getTotalPrice() {
    let total = 0;
    this.cartItemList.map((a: any) => {
      total += a.total;
    });
  }
}
