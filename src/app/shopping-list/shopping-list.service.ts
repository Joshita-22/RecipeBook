import { EventEmitter } from '@angular/core';
import { Ingrident } from './../shared/ingridents.model';


export class ShoppingListService{
    ingridentsChanged=new EventEmitter<Ingrident[]>();
    startedEditing=new EventEmitter<number>();
  private  Ingridents:Ingrident[]=[
        new Ingrident('lemon',5),
        new Ingrident('orange',3)
      ];

      getIngrident(index:number){
        return this.Ingridents[index];
      }
      getIngridents(){
          return this.Ingridents;
      }
      updateIngrident(index:number,newIngridents:Ingrident){
        this.Ingridents[index]=newIngridents;
        this.ingridentsChanged.emit(this.Ingridents.slice());
      }
      addIngrident(Ingrident:Ingrident){
          this.Ingridents.push(Ingrident);
          this.ingridentsChanged.emit(this.Ingridents.slice());
      }

      deleteIngrident(index:number){
        this.Ingridents.splice(index,1);
        this.ingridentsChanged.emit(this.Ingridents.slice());
    }
      addIngridents(ingridents:Ingrident[]){
        //   for(let ingrident of ingridents){
        //       this.addIngrident(ingrident);
        //   }
        this.Ingridents.push(...ingridents);
        this.ingridentsChanged.emit(this.Ingridents.slice());

      }
}