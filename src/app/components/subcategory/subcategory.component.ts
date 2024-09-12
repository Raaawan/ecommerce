import { Component, inject, OnInit } from '@angular/core';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategory';
import { Isubcategory } from '../../core/interfaces/isubcategory';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements OnInit{

  private readonly _SubcategoryService=inject(SubcategoryService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  getSubCategoriesSubscription!:Subscription
  gettSubCategoriesSubscription!:Subscription
  getttSubCategoriesSubscription!:Subscription
  detailsSubCategory:Isubcategory[]=[]




  ngOnInit(): void {
    

    this.gettSubCategoriesSubscription=this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idsubCategory=p.get('id')
        this.getttSubCategoriesSubscription=this._SubcategoryService.getAllSubCategories(idsubCategory).subscribe({
          next:(res)=>{
            this.detailsSubCategory=res.data
            console.log(this.detailsSubCategory)


          }
          
        })

      },
      error:(err)=>{
        console.log(err)
      }
    })
    
    
  }


}
