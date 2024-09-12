import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,SubcategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit,OnDestroy {
  //interfaces
  categoris:Icategory[]=[]

  // services
  private readonly _CategoriesService =inject(CategoriesService)

  //properties
  text:string=""

  // Subscription
  getAllCategoriesSubscription!:Subscription

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.getAllCategoriesSubscription=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoris=res.data
      }
    })
  }

  

}
