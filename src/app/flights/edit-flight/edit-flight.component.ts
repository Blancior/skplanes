import {Component,ViewChild} from '@angular/core';
import {FlightsService} from "../../core/services/flights.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlightFormComponent} from "../flight-form/flight-form.component";
import {tap} from "rxjs/operators";
import {Flight} from "../../models/flight.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent {
  @ViewChild('flightForm') flightForm: FlightFormComponent | undefined;

  flight: Flight | undefined;

  constructor(
    private route: ActivatedRoute,
    private toast: MatSnackBar,
    private router: Router,
    private flightsService: FlightsService
  ) { }

  ngAfterViewInit() {
    this.loadFlight();
  }

  removeFlight() {
    this.flightsService.removeFlight(this.flight!.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this))
  }

  editFlight() {
    // @ts-ignore
    this.flightsService.editFlight(this.flight?.key, this.flightForm?.form.value)
      .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));

  }

  private onEditSuccess() {
    this.router.navigate(['/dashboard'])
    this.toast.open('Flight has been succesfully edited', '', {panelClass: 'toast-success'})
  }

  private onFailure(error:any) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'})
  }

  private onRemoveSuccess() {
    this.router.navigate(['/dashboard'])
    this.toast.open('Flight has been succesfully removed', '', {panelClass: 'toast-success'})

  }

  private loadFlight() {
    const key = this.route.snapshot.params['key'];
    this.flightsService.getFlight(key)
      .pipe(tap(flight => this.flightForm?.setFlight(flight)))
      .subscribe(flight => this.flight = flight);
  }
}


