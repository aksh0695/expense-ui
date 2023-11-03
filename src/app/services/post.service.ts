import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



@Injectable()

export class PostService {

  private url = 'http://localhost:8080/v1/';

  private userContext = 'user/';
  private expenseContext = 'expense/';



  constructor(private httpClient: HttpClient) { }



  getPosts(){
    
    return this.httpClient.get(this.url);

  }

  authenticateUser<IResponse>(userName : String,password: String) {
     let finalUrl = this.url + this.userContext+ "authenticate";
     let User = {"email" : userName, "password":password};
     return this.httpClient.post<IResponse>(finalUrl,User);
  }

  getUserDetails<IResponse>(userId : number){
    let finalUrl = this.url+this.expenseContext+'all/'+userId;
    return this.httpClient.get<IResponse>(finalUrl);
  }


}
