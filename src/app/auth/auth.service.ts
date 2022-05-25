import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { throwError} from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}
@Injectable({providedIn:'root'})
export class AuthService{
    user=new BehaviorSubject<User>(null);
    
    constructor(private http:HttpClient,private router:Router){}
    signup(email:string,password:string){

      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIxMbjsW6-Ku82g8zM9FueagqaTNHVOXk',
        {email:email,
        password:password,
        returnSecureToken:true
}
).pipe(catchError(this.handleError));
    
    }

    login(email:string,password:string){
       
         return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIxMbjsW6-Ku82g8zM9FueagqaTNHVOXk',
        {email:email,
        password:password,
        returnSecureToken:true
    })
    .pipe(catchError(this.handleError),tap(resData=>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        
    })
    );

    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate=new Date(new Date().getTime()+expiresIn*1000);
        const user=new User(email,userId,token,expirationDate);
        this.user.next(user);
    }
    private handleError(errorRes:HttpErrorResponse){
        
            let errormsg='an unkown error occurred!';
            if(!errorRes.error||!errorRes.error.error){
                return throwError(errormsg);
            }
            
            
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errormsg='this email exists';
                    break;
                    case 'EMAIL_NOT_FOUND':  
                    errormsg='this email does not exists';
                    break;
                    case 'INVALID_PASSWORD':
                    errormsg='this email is not correct';
                    break; }
            return throwError(errormsg);
        
    }
}