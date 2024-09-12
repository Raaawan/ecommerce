import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { Ilist } from '../../core/interfaces/ilist';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,SearchPipe,RouterLink,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,OnDestroy {
  //interfaces
  productsList:Iproduct[]=[]
  wishList:Iproduct[]=[]



isActive:boolean=false

  
  // services
  private readonly _ToastrService=inject(ToastrService)
  private readonly _CartService=inject(CartService)
  private readonly _WishlistService=inject(WishlistService)
  private readonly _ProductsService =inject(ProductsService)

  //properties
  text:string=""

  // Subscription
  getAllProductSubscription!:Subscription
  addProductToCartSubscription!:Subscription
  addProductToWishListSubscription!:Subscription
  deleteSpecifcProductFromWishListSubscription!:Subscription


ngOnInit(): void {
  this.getAllProductSubscription=this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.productsList=res.data
    }
  })
}
addProductToCart(id:string){
  this.addProductToCartSubscription=this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success('It has been successfully added')
      this._CartService.cartNumber.next(res.numOfCartItems)

      
    }
  })
}
addProductToWishList(id:string){
  this.addProductToWishListSubscription=this._WishlistService.addProductToWishList(id).subscribe({
    next:(res)=>{
      console.log("here",res)
      this._ToastrService.success('It has been successfully added')
      // this.isActive=true

      
    }
  })
  
}
removeItem(id:string):void{
  this.deleteSpecifcProductFromWishListSubscription= this._WishlistService.deleteSpecificProductFromWishList(id).subscribe({
    next:(res)=>{
      this.productsList=res.data
      this.ngOnInit()
      this._ToastrService.success('It has been successfully deleted')



    }
  })
}
ngOnDestroy(): void {
    this.getAllProductSubscription?.unsubscribe()
    this.addProductToCartSubscription?.unsubscribe()
    this.addProductToWishListSubscription?.unsubscribe()

  
}


toggle(product:Ilist):void{
  if(this.isinwishlist(product)){
    this._WishlistService.removeFromWishList(product)
    this.removeItem(product.id)
  }
  else{
    this.addProductToWishList(product.id)
    this._WishlistService.addToWishList(product)
  }
}
isinwishlist(product:Ilist):boolean{
  return this._WishlistService.isInWishList(product)
}

}



