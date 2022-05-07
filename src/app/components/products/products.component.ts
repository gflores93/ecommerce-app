import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: Array<any> = [
    {
      name: 'All products',
      description: '',
      imgUrl: 'https://www.forelle.com/media/images/american-football/58190091-Riddell-KombineSK.png',
      category: ''
    },
    {
      name: 'Equipment',
      description: 'Helmets, Shoulder pads, Faceguards',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWdQGoTzsJfqEqYyv4udeaZp_MsN4-Yfc-rH_G4KtwK4Kt4cGtDyQNsN95cNM7OAFDzXI&usqp=CAU',
      category: 'fashion'
    },
    {
      name: 'Accessories',
      description: 'Protective gear, Jaw Pads, Mouseguards Back Plates, Visors, Pads, Bags,',
      imgUrl: 'https://www.futspo.de/futuresport/prodpic/ADIZERO-8-0-Football-Receiver-Gloves-Adidas-5-Star-FBADIZ8_b_1.JPG',
      category: 'jewelery'
    },
    {
      name: 'Apparel',
      description: 'Jerseys, Pants, Cleats, Gloves, Vests, Belts',
      imgUrl: 'https://www.american-footballshop.de/media/image/product/47561/md/nike-stock-vapor-varsity-practice-football-jersey-schwarz-gr-3xl.jpg',
      category: 'electronics'
    },
    {
      name: 'Extras',
      description: 'Footballs, NFL Clothing, Jerseys, Hoodies, Caps',
      imgUrl: 'https://europe.nflshop.com/content/ws/all/3567b18d-fe55-46b1-aabb-78482d62b2de__640X555.png',
      category: ''
    },
  ];
  public productList: any;
  public categoryList: any;
  public searchKey: string = '';
  public loading: boolean = true;
  // 1: inserted, 2: already inserted, 3: deleted
  public alert: any = {};
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getProduct()
    .subscribe({
      next: (res) => {
         this.productList = res;
         this.categoryList = res;
         this.productList.forEach((a: any) => {
          if(a.category.includes('clothing')) a.category = 'fashion';
          Object.assign(a, {quantity: 1, total: a.price});
         });
         this.loading = false;
        }
    });

    // subscribe to the observable that is emmited from the header component
    this.cartService.search.subscribe((val: string) => {
      this.searchKey = val;
    })
  }

  addToCart(product: any) {
    this.alert = this.cartService.addToCart(product);
  }

  // used for the alert
  onDismissError() {
    this.alert = undefined;
  }

  filterByCategory(category: string) {
    this.categoryList = this.productList
    .filter((a: any) => a.category === category || category === '');
  }

}
