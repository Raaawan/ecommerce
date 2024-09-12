import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css'
})
export class CategorydetailsComponent implements OnInit,OnDestroy  {

  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _CategoriesService=inject(CategoriesService)
  getCategorySubscription!:Subscription
  getCategoryIdSubscription!:Subscription
  detailsCategory:Icategory|null=null

  ngOnInit(): void {
    this.getCategorySubscription=this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idCategory=p.get('id')
        this.getCategoryIdSubscription=this._CategoriesService.getSpecificCategory(idCategory).subscribe({
          next:(res)=>{
            this.detailsCategory=res.data


          }
          
        })

      },
      error:(err)=>{
        console.log(err)
      }
    })
  
    
    
  }


  ngOnDestroy(): void {
    this.getCategoryIdSubscription?.unsubscribe()
    this.getCategorySubscription?.unsubscribe()
    
  }

}
