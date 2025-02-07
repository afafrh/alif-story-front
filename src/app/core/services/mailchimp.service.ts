import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {

  apiKey = "f08478374cb9289c0d4c26838cab9607-us19";

  baseUrl = "https://us19.api.mailchimp.com/3.0/lists/130c1c99c0/members";
  
  headers = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + this.apiKey,
    'Access-Control-Allow-Origin': '*'
  });

  
  constructor(private httpClient: HttpClient) { }
  
  subscribeToNewsletter(body: any) {
    return this.httpClient.post(this.baseUrl, body, { headers: this.headers })
  }
}
