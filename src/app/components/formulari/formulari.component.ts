import { Component } from '@angular/core';
import { CridesService } from '../services/api/crides.service';
import { PuntsInteres } from 'src/app/model/implementations/puntsInteres/puntsInteres';

@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent {
  error = "";
  textAltitud = "";
  latMin!: number;
  latMax!: number;
  lngMin!: number;
  lngMax!: number;
  nom!: string;
  categoria!: string;
  valoracioMinima!: number;
  pointsOfInterestSet: any[] = [];
  pointsOfInterest: PuntsInteres[] = [];
  pointOfInterest = new PuntsInteres(0, '', 0, 0);
  mapImageUrl: string | null = null;
  mapZoom!: number;
  imgCopyright:string | null = null;
  stringCopyright:string|null=null;

  constructor(private cridesService: CridesService) {}

  getPuntsInteres() {
    if (
      this.latMin > -90 ||
      this.latMin < 90 ||
      this.latMax > -90 ||
      this.latMax < 90 ||
      this.lngMin > -180 ||
      this.lngMin < 180 ||
      this.lngMax > -180 ||
      this.lngMax < 180
    ) {
      if (this.latMin <= this.latMax) {
        if (this.lngMin <= this.lngMax) {
          this.cridesService
            .getPuntsInteres(
              this.latMin,
              this.latMax,
              this.lngMin,
              this.lngMax,
              this.categoria,
              this.valoracioMinima,
              this.nom
            )
            .subscribe(
              (data: any) => {
                data.forEach((element: any) => {
                  if (
                    !this.pointsOfInterestSet.find(
                      (p: any) => p.xid === element.xid
                    )
                  ) {
                    const puntInteres = new PuntsInteres(
                      element.xid,
                      element.name,
                      element.point.lat,
                      element.point.lon
                    );
                    this.pointsOfInterest.push(puntInteres);
                    this.pointsOfInterestSet.push(element.xid);
                  }
                });
              },
              (error: any) => {
                console.error(error);
              }
            );
        } else {
          this.error = "El valor mínim de longitud és superior al valor màxim";
        }
      } else {
        this.error = "El valor mínim de latitud és superior al valor màxim";
      }
    } else {
      this.error = "Els valors introduïts no són correctes";
    }
  }

  getElevationData() {
    if (this.pointOfInterest == null) {
      this.textAltitud = "No has seleccionat cap punt d'interès";
      this.mapImageUrl = null;
    } else {
      this.cridesService
        .getElevation(this.pointOfInterest.latitud, this.pointOfInterest.longitud)
        .subscribe(
          (data: any) => {
            this.textAltitud =
              "Altura sobre el nivell del mar: " +
              data.resourceSets[0].resources[0].elevations[0];
              this.imgCopyright=data.brandLogoUri;
              this.stringCopyright=data.copyright;
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }
  
  getMapImage() {
    if (this.pointOfInterest == null) {
      this.textAltitud = "No has seleccionat cap punt d'interès";
      this.mapImageUrl = null;
    } else {
      this.cridesService
        .getMapImage(
          this.pointOfInterest.latitud,
          this.pointOfInterest.longitud,
          this.mapZoom
        )
        .subscribe(
          (imageData: any) => {
            this.mapImageUrl = imageData.resourceSets[0].resources[0].imageUrl;
          },
          (error: any) => {
            console.error(error);
            this.mapImageUrl = null;
          }
        );
    }
  }
  

  zoom(zoom: number){
    this.mapZoom += zoom;
    this.getMapImage();
  }
    
}  