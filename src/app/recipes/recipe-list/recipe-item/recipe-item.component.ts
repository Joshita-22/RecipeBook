import { RecipeService } from './../../recipe.service';
import { Component, Input, OnInit, } from '@angular/core';
import{ recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

 @Input() recipe:recipe;
 @Input() index:number;
  constructor(private RecipeService:RecipeService) { }

  ngOnInit(): void {
  }

}
