import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {

  apiKey = "53df870bd633f51d3430376471aa6ab0-us19";

  baseUrl = "https://us19.api.mailchimp.com/3.0/lists/130c1c99c0/members";

  
  constructor(private httpClient: HttpClient) { }
  
  subscribeToNewsletter(body: any) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.apiKey);
    headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post(this.baseUrl, body, {headers: headers})
  }
}
