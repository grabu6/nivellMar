import { Component } from '@angular/core';
import { CridesService } from '../services/api/crides.service';

@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent {

  latMin!: number;
  latMax!: number;
  lngMin!: number;
  lngMax!: number;
  pointsOfInterest!: any[];
  selectedPoint: any;

  constructor(private cridesService: CridesService) {}

  getPuntsInteres() {
    this.cridesService.getPuntsInteres(this.latMin, this.latMax, this.lngMin, this.lngMax)
      .subscribe(
        (response: any) => {
          this.pointsOfInterest = response;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}