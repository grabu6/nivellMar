import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CridesService {

  constructor(private http: HttpClient) { }
  requestOptions = this.createHeader();
  
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  getPuntsInteres(latMin: number, latMax: number, lngMin: number, lngMax: number) {
    const url = `${this.apiUrl}?latMin=${latMin}&latMax=${latMax}&lngMin=${lngMin}&lngMax=${lngMax}`;
    return this.http.get(url,this.requestOptions);
  }
  
  private createHeader(){

    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    }
    return {headers: new HttpHeaders(header)};
}
}
