import { recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  
})
export class RecipesComponent implements OnInit {
 selectedRecipe:recipe;
  constructor(private RecipeService:RecipeService) { }

  ngOnInit(): void {
    this.RecipeService.recipeSelected
    .subscribe(
      (recipe:recipe)=>{
        this.selectedRecipe=recipe;
      }

    );
  }

}
