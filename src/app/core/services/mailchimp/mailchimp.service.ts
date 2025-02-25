import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {

  baseUrl = "https://alif-story-services.onrender.com/api/subscribe";

  
  constructor(private httpClient: HttpClient) { }
  
  subscribeToNewsletter(body: any) {
    return this.httpClient.post(this.baseUrl, body)
  }
}
