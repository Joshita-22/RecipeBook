import { Ingrident } from './../../shared/ingridents.model';
import { Component,  OnInit, ViewChild, } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{static:false}) slForm:NgForm;
  editMode=false;
  editedItemIndex:number=0;
  editedItem:Ingrident;


  
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.slService.getIngrident(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })

    })
  }
  onAddItem(form:NgForm){
    const value=form.value;
    const newIngrident=new Ingrident(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngrident(this.editedItemIndex,newIngrident)
    }else{
      this.slService.addIngrident(newIngrident);
    }
    this.editMode=false;
    form.reset();
    
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngrident(this.editedItemIndex);
    this.onClear();
  }


}
