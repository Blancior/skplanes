import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Flight} from "../../models/flight.model";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private API_URL = '/flights';
  constructor(private db: AngularFireDatabase) {

  }
  getFlights(): Observable<Flight[]> {
    return this.db.list<Flight>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(flight => this.assignKey(flight))));
  }

  addFlight(flight: Flight) {
    return this.db.list<Flight>(this.API_URL).push(flight);
  }
  private assignKey(flight:any) {
    return{...flight.payload.val(),  key:flight.key}
  }
}
