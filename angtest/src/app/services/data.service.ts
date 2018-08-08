import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(public httpClient: HttpClient) { }

  selectedResult: any = {};

  getRestaurants(key) {
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post('http://code.prontoinfotech.com/MyGigStar/Clubsearchautocompleteapi',
      { "business": key } ,
      { headers }
    )
    .map((res) => {
      return res;
    });
  }

}
 
