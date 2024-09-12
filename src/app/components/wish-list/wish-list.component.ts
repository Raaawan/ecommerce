import { Ilist } from './../../core/interfaces/ilist';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink,NgFor,CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit  {
  private readonly _WishlistService =inject(WishlistService)
  wishItems:Ilist[]|null=null



  UpdateSpecifcProductFromWishListSubscription!:Subscription
  deleteSpecifcProductFromWishListSubscription!:Subscription
  addProductToWishListSubscription!:Subscription

  // ngOnInit(): void {
  //  this.UpdateSpecifcProductFromWishListSubscription= this._WishlistService.getProductsWishList().subscribe({
  //   next:(res)=>{
  //     console.log(res)
  //     console.log(res.data)
  //     this.wishItems=res
  //   },
  //   error:(err)=>{
  //     console.log(err)
  //   }
  //  })
    
  // }
  ngOnInit(): void {
    this.UpdateSpecifcProductFromWishListSubscription=this._WishlistService.getProductsWishList().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.wishItems=res.data
      }
    })
  }
  removeItem(id:string):void{
    this.deleteSpecifcProductFromWishListSubscription= this._WishlistService.deleteSpecificProductFromWishList(id).subscribe({
      next:(res)=>{
        this.ngOnInit()
        this.wishItems=res.data
        // this._WishlistService.removeFromWishList(product)



      }
    })
  }


 
}
