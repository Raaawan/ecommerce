import { Iproduct } from './../interfaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Ilist } from '../interfaces/ilist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient =inject(HttpClient)

  private wishList:Ilist[]=[]
  private iDStorage='wishList'
 
  constructor(){
    const storesID=localStorage.getItem(this.iDStorage)
    if(storesID){
     this.wishList= JSON.parse(storesID)
    }
  }

  addProductToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
    "productId": id
      }
    )
  }

  

  getProductsWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`
    )
  }

  deleteSpecificProductFromWishList(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`
    )
  }

 isInWishList(product:Ilist):boolean{
  return this.wishList.some(item=>item.id===product.id)
 }

 addToWishList(product:Ilist):void{
  this.wishList.push(product)
console.log("Added")
localStorage.setItem(this.iDStorage,JSON.stringify(this.wishList))
 }
 removeFromWishList(product:Ilist):void{
  const index=this.wishList.findIndex(item=>item.id===product.id)
  if(index!==1){
    this.wishList.splice(index,1)
localStorage.setItem(this.iDStorage,JSON.stringify(this.wishList))


  }
console.log("deleted")
 }

 
}
