import { recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({providedIn:'root'})
export class DataStorageService{ 
    constructor(private http:HttpClient,private recipeService:RecipeService){}

        storeRecipes(){
            const recipes=this.recipeService.getRecipes();
            this.http.put('https://recipe-book-bfcbb-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
            .subscribe(response=>{
                console.log(response);
            });
        }
        fetchRecipes(){
            this.http.get<recipe[]>('https://recipe-book-bfcbb-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
            .subscribe(recipes=>{
                this.recipeService.setRecipes(recipes);
                // localStorage.setItem('recipe',JSON.stringify(recipes))

            })
        }
        
    }

