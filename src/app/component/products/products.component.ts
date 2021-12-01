import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  public productList : any;
  public filterCategory : any;
  searchKey:string = "";

  constructor(private api : ApiService, private cartSevice : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;

      this.productList.forEach((a:any)=>{
        if(a.catecory === "Women's clothing" || a.category === "men's clothing")
        Object.assign(a,{quantity:1,total:a.price});
      })
    })

    this.cartSevice.search.subscribe(val=>{
      this.searchKey = val;
    })

  }

  addtocart(item:any){
    this.cartSevice.addtoCart(item);
  }

  filter(category:string){
   this.filterCategory = this.productList
   .filter((a:any)=>{
     if(a.category == category || category == ''){
       return a;
     }
   })
  }

}