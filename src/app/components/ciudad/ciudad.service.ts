import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../utils/config/config.service';
import { SesionService } from '../../utils/sesion/sesion.service';


@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  controller: string = "ciudad/";
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private sesion: SesionService
  ) { }



  create(data: any): Observable<any> {
    return this.http.post(this.config.apiUrl + this.controller + 'create', { ciudad: data }, this.sesion.headers);
  }
  update(data: any): Observable<any> {
    return this.http.put(this.config.apiUrl + this.controller + 'update/' + data.id, { ciudad: data }, this.sesion.headers);
  }
  delete(data: any): Observable<any> {
    return this.http.delete(this.config.apiUrl + this.controller + 'delete/' + data, this.sesion.headers);
  }
  view(id: any): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "view/" + id, this.sesion.headers);
  }
  estado(id: any): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "estado/" + id, this.sesion.headers);
  }
  index(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "index", this.sesion.headers);
  }
  select(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + 'select', this.sesion.headers);
  }

}
