import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { recipe } from "./recipe.model";
import { Observable } from 'rxjs';
@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<recipe[]>{
    constructor(private DataStorageService:DataStorageService,
        private RecipeService:RecipeService){}
    
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.RecipeService.getRecipes();
        if(recipes.length==0){
        return this.DataStorageService.fetchRecipes();
    }else{
        return recipes;
    }
}
    
}