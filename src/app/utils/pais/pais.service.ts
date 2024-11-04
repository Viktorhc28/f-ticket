import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionService } from '../sesion/sesion.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  controller: string = "pais/";

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private sesion: SesionService,
  ) { }

  getPaises(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "index", this.sesion.headers);
  }
}