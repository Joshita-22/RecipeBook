import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { take,exhaustMap, map, tap } from 'rxjs';



@Injectable({providedIn:'root'})
export class DataStorageService{ 
    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

        storeRecipes(){
            const recipes=this.recipeService.getRecipes();
            this.http.put('https://recipe-book-bfcbb-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
            .subscribe(response=>{
                console.log(response);
            });
        }
        fetchRecipes(){
           
                return this.http
                .get<recipe[]>(
                    'https://recipe-book-bfcbb-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
                   
                    ).pipe(
            map(recipes=>{
                return recipes.map(recipe=>{
                    return{...recipe,ingridents:recipe.ingridents?recipe.ingridents:[]
                    };

                });
                
            }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
            );

           
           
            // .subscribe(recipes=>{
            //     // this.recipeService.setRecipes(recipes);
            //     // localStorage.setItem('recipe',JSON.stringify(recipes))

            // });
        }
        
    }



