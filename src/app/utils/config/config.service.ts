import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  urlBase = environment.apiURL;
  apiUrl = this.urlBase + "api/v1/"
}
