import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy  {
  isAuthenticated=false;
  private userSub:Subscription;
constructor(private DataStorageService:DataStorageService,private authService:AuthService ){}
  onSaveData(){
    this.DataStorageService.storeRecipes();
  }
  onFetchData(){
    this.DataStorageService.fetchRecipes().subscribe();
  }
  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe( user=>{
     this.isAuthenticated=!user?false:true;
    });
      
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}

