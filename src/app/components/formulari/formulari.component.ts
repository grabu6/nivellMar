import { Component } from '@angular/core';
import { CridesService } from '../services/api/crides.service';
import { PuntsInteres } from 'src/app/model/implementations/puntsInteres/puntsInteres';

@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent {

  textAltitud="";
  latMin!: number;
  latMax!: number;
  lngMin!: number;
  lngMax!: number;
  pointsOfInterestSet: any[]= [];
  pointsOfInterest: PuntsInteres[]= [];
  pointOfInterest=new PuntsInteres(0, '', 0, 0);
  selectedPoint: any;

  constructor(private cridesService: CridesService) {}

  getPuntsInteres() {
    this.cridesService.getPuntsInteres(this.latMin, this.latMax, this.lngMin, this.lngMax)
      .subscribe((data:any) => {
        data.forEach((element: any) => {
          if(!this.pointsOfInterestSet.find((p: any) => p.xid === element.xid)) {
            const puntInteres= new PuntsInteres(element.xid, element.name, element.point.lat, element.point.lon);
            this.pointsOfInterest.push(puntInteres);
            this.pointsOfInterestSet.push(element.xid);
        }
      });},
        (error: any) => {
          console.error(error);
        }
      );
  }

  getElevation(){
    if(this.pointOfInterest==null){
      this.textAltitud="No has seleccionat cap punt d'interès";
    }else{
    
    this.cridesService.getElevation(this.pointOfInterest.latitud, this.pointOfInterest.longitud)
      .subscribe((data:any) => {
        this.textAltitud="Altura sobre el nivell del mar: "+data.resourceSets[0].resources[0].elevations[0];
    },(error: any) => {
      console.error(error);
    });
    }
  }
}