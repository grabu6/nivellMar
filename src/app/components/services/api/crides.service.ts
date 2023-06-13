import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenTripMaps } from '../../../../environments/OpenTripMaps/environmentOpenTripMaps';
import { BingMaps } from '../../../../environments/BingMaps/environmentBingMaps';

@Injectable({
  providedIn: 'root'
})
export class CridesService {

  constructor(private http: HttpClient) { }
  
  
  private apiUrlOpenTrip = OpenTripMaps.apiUrl;
  private apiKeyOpenTrip = OpenTripMaps.apiKey;

  private apiUrlBigMaps=BingMaps.apiUrl;
  private apiKeyBingMaps=BingMaps.apiKey;

  getPuntsInteres(latMin: number, latMax: number, lngMin: number, lngMax: number, categoria: string, valoracioMinima: number, nom: string) {
    const url = `${this.apiUrlOpenTrip}en/places/bbox?lon_min=${lngMin}&lon_max=${lngMax}&lat_min=${latMin}&lat_max=${latMax}&kinds=${categoria}&name=${nom}&rate=${valoracioMinima}&format=json&apikey=${this.apiKeyOpenTrip}`;
    return this.http.get(url);
  }
  getElevation(lat: number, lng: number) {
    const url = `${this.apiUrlBigMaps}Elevation/List/?points=${lat},${lng}&key=${this.apiKeyBingMaps}`;
    return this.http.get(url);
  }

  getMapImage(lat:number,lng:number,zoom: number) {
    const url = `${this.apiUrlBigMaps}Imagery/Metadata/Aerial/${lat},${lng}?zoomLevel=${zoom}&include=ImageryProviders&key=${this.apiKeyBingMaps}`;
    console.log(url);
    return this.http.get(url);
  }  
}


