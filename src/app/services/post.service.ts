import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



@Injectable()

export class PostService {

  private url = 'http://localhost:8080/v1/';



  constructor(private httpClient: HttpClient) { }



  getPosts(){

    return this.httpClient.get(this.url);

  }



}
