import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AllordersService } from '../../core/services/allorders.service';
import { Iallproduct } from '../../core/interfaces/iallproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit,OnDestroy {

  private readonly _AllordersService =inject(AllordersService)

  AllOrders:Iallproduct|null=null
  GetAllOrdersSubscription!:Subscription



  ngOnInit(): void {
   this.GetAllOrdersSubscription= this._AllordersService.getOrders().subscribe({
      next:(res)=>{
        console.log(res)
        this.AllOrders=res.data
      }
    })
  }
  ngOnDestroy(): void {
    this.GetAllOrdersSubscription?.unsubscribe()
    
  }
}
