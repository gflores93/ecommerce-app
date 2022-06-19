import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductInterface } from '../types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }

  //https://fakestoreapi.com/products
 /*
  The pipe method is for chaining observable operators,
  and the subscribe is for activating the observable and listening for emitted values.

  .subscribe() methods accepts both observer object(can include next(), error(), complete()) 
  and inline handlers (can pass null to unimplemented handler)

  Observable stream 
  .pipe() can be used to define the handlers in the stream (map(), catchError(), finalize())

 */
// Observable stream that wont do nothing by iteself, to execute it we need to subscribe to it
  getProduct() {
    return this.http.get<any>(this.apiUrl)
    .pipe(
      map((res: ProductInterface[]) => {
        console.log(res);
        return res;
      })
    );
  }
}
