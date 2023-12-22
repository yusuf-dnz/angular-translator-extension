import { Injectable } from '@angular/core';
import axios, {AxiosRequestConfig} from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslatorApiService {
  key = environment.translatorApiKey;
  endpoint = environment.translatorApiURL;
  location = environment.translatorApiLocation;

  translator(text:string, from:string, to:string): Observable<any>{
    const config: AxiosRequestConfig  = {
      baseURL: this.endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': this.key,
        'Ocp-Apim-Subscription-Region': this.location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      },
      params: {
        'api-version': '3.0',
        from: from,
        to: to,
      },
      data: [
        {
          text: text
        },
      ],
      responseType: 'json',
    }
    return new Observable(observer => {
      axios(config)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  getLanguages(): Observable<any>{
    const config: AxiosRequestConfig={
      baseURL: 'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0',
      headers: {'X-Custom-Header': 'foobar'}
    }
    return new Observable(observer=>{
      axios(config)
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    })
  }
}
