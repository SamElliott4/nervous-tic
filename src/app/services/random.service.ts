import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  private key:string;

  constructor(private http:HttpClient) {

   }

  getRandomNumber(min:number, max:number):Promise<any>{


    let url = "https://api.random.org/json-rpc/2/invoke";

    let body = {
      "jsonrpc": "2.0",
      "method": "generateIntegers",
      "params": {
        "apiKey": "8ff64a40-4237-4feb-8ce1-2dc0aba3399d",
        "n": 1,
        "min": min,
        "max": max,
        "replacement": false
      },
      "id": 1
    }

    let headers = {
      "Content-type": "application/json"
    };
    let requestOptions = {
      headers: headers
    }

    let response:Promise<any> = this.http.post(url, body, requestOptions).toPromise();
    return response;
  }

}
