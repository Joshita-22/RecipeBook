import { Ingrident } from './../shared/ingridents.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 Ingridents:Ingrident[];
  constructor(private slServerice:ShoppingListService) { }

  ngOnInit() {
    this.Ingridents=this.slServerice.getIngridents();
    // this.slServerice.ingridentsChanged
    // .subscribe(
    //      (ingridents:Ingrident[])=>{
    //        this.Ingridents=this.Ingridents;

    //      }
    // );
  }
  onEditItem(index:number){
    this.slServerice.startedEditing.emit(index);
  }
 
}
