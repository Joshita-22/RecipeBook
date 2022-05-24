import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from "@angular/core";
import { Ingrident } from "../shared/ingridents.model";
import { recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
    recipeSelected=new EventEmitter<recipe>();
    recipesChanged=new EventEmitter<recipe[]>();
//   private  recipes:recipe[]=[
//         new recipe('Pasta',
//         'white sauce pasta',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQjVd5Ke7XmYJVLF-bzdIyMUnCk-pwPmHtg&usqp=CAU',
//         [
//             new Ingrident('pasta',1),
//             new Ingrident('capsicum',1),
//         ]),
       
//          new recipe('Pasta2',
//          'red sauce pasta',
//          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQjVd5Ke7XmYJVLF-bzdIyMUnCk-pwPmHtg&usqp=CAU',
//          [
//             new Ingrident('pasta',1),
//             new Ingrident('carrots',1),
//          ]),
//       ];
      private  recipes:recipe[]=[];

      constructor(private slService:ShoppingListService){

      }
      setRecipes(recipes:recipe[]){
          this.recipes=recipes;
          this.recipesChanged.emit(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index:number){
          return this.recipes[index];
      }

      addIngridentsToShoppingList(ingridents:Ingrident[]){
          this.slService.addIngridents(ingridents);

      }

      addRecipe(recipe:recipe){
          this.recipes.push(recipe);
          this.recipesChanged.emit(this.recipes.slice())
      }

      updateRecipe(index:number,newRecipe:recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.emit(this.recipes.slice())
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.emit(this.recipes.slice())
    }
}