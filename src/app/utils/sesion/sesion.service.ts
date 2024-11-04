import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Router } from '@angular/router';
import { ID_PAIS_CHILE } from '../../utils/pais/util';
import { Parametro } from '../../utils/parametros/parametro';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  ROL_ADMINISTRADOR_KUVEMAR = 1;
  ROL_ADMINISTRADOR = 1;
  ROL_EDITOR = 2;
  ROL_VISUALIZADOR = 3;
  ROL_CLIENTE = 4;
  ROL_CAJERO = 5;
  ROL_OPERADOR = 6;
  ROL_JEFE_TALLER = 7;

  usuario: any = null;

  get enableSubscriptionUI(): boolean { return this.user?.pais_id == ID_PAIS_CHILE; };
  get username() { return this.user.nombre; };
  get id() { return this.user.id };
  get token(): string { return localStorage.getItem('token') ?? '' };
  get user() { if (this.usuario !== null) return this.usuario; let usrStr = localStorage.getItem('usuario'); if (usrStr) return JSON.parse(usrStr); else return {}; };
  get rol() { return this.user.rol_id };
  get conceptoActivado(): boolean { return this.user.parametros && this.user.parametros.concepto_activado == '1' };
  get siiActivado(): boolean { return this.user.parametros && this.user.parametros.sii_activado == '1' };
  get descargaAutomatica(): boolean { return this.user.parametros && this.user.parametros.descarga_automatica == '1' };
  get duracionReunion(): number {
    let defecto = parseInt(Parametro.DURACION_REUNION_DEFAULT);
    if (this.user.parametros && this.user.parametros.duracion_reunion) {
      const duracion = this.user.parametros.duracion_reunion;
      return isNaN(duracion) ? defecto : parseInt(duracion);
    }
    return defecto;
  };

  get IVA(): number {
    const defecto = 19;
    if (this.user.parametros && this.user.parametros.iva) {
      const iva = parseFloat(this.user.parametros.iva);
      return isNaN(iva) ? defecto : iva;
    }
    return defecto;
  }

  // 1 defecto, que es precio en bruto
  get formatoPrecioRevision(): number {
    let tipo = 1;
    if (this.user.parametros && this.user.parametros.formato_precio_revision) {
      tipo = this.user.parametros.formato_precio_revision;
    }
    return tipo;
  }

  get lineasRevisionEnBruto(): boolean {
    // 1 bruto 2 neto
    // defecto en bruto
    if (!this.user.parametros || this.user.parametros.valor_linea_revision === undefined) {
      return true;
    }
    return this.user.parametros.valor_linea_revision == '1';
  }

  /**
   * Actualiza una propiedad de parametros, del user de localStorage y sesion service.
   * @param clave clave en minuscula ej: sii_activado
   * @param valor
   */
  actualizarParametroUser(clave: string, valor: number | string) {
    const usuario = JSON.parse(localStorage.getItem('usuario') ?? '{}');
    if (!usuario.parametros) {
      usuario.parametros = {};
    }
    usuario.parametros[clave] = valor;
    localStorage.setItem('usuario', JSON.stringify(usuario));

    if (!this.usuario.parametros) {
      this.usuario.parametros = {};
    }
    this.usuario.parametros[clave] = valor;
  }

  esPaisChile(idPais?: number | string): boolean {
    const pais = idPais ? idPais : this.user?.pais_id;
    return pais == ID_PAIS_CHILE;
  }

  /**
   * Del usuario en localStorage y en sesion service
   * @param idPais
   */
  actualizarPaisIdUser(idPais: number | string) {
    const usuario = JSON.parse(localStorage.getItem('usuario') ?? '{}');
    usuario.pais_id = idPais;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario.pais_id = idPais;
  }

  routes: any[] = [];
  routesForSearch: any[] = [];
  notifications: any[] = [];
  sucursales: any[] = [];
  _sucursal: any = null;
  get sucursal(): any { 
    if (this._sucursal) return this._sucursal; 
    let sucursal = localStorage.getItem('lubrikuv-Sucursal'); 
    if (sucursal) { 
      this._sucursal = JSON.parse(sucursal); 
      return JSON.parse(sucursal) 
    };
    let sucursal_id = localStorage.getItem('sucursal_id');
    if(sucursal_id) return sucursal_id;
    return 0;
  };
  sucursalIndex: number = 0;

  controller: string = "sesion/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
        'Sucursal': this.sucursal ? `${this.sucursal.id}` : `${this.loadLocalSucursal()}` ?? '',
      })
    }
  };

  get headersBlob() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
        'Sucursal': this.sucursal ? `${this.sucursal.id}` : `${this.loadLocalSucursal()}` ?? '',
      }),
      responseType: 'blob' as 'json',
    }
  };

  get headersFile() {
    return {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Sucursal': this.sucursal ? `${this.sucursal.id}` : `${this.loadLocalSucursal()}` ?? '',
      })
    }
  }

  get headersFileBlob() {
    return {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Sucursal': this.sucursal ? `${this.sucursal.id}` : `${this.loadLocalSucursal()}` ?? '',
      }),
      responseType: 'blob' as 'json',
    }
  }

  get headersHTML() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
        'Sucursal': this.sucursal ? this.sucursal.id : '',
      }),
      responseType: 'text/html' as 'json',
    }
  }

  private rutasSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  rutas$ = this.rutasSubject.asObservable();

  setRutas(rutas: any[]): void {
    this.rutasSubject.next(rutas);
    localStorage.setItem('rutas', JSON.stringify(rutas));
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router,
  ) {
    this.loadRutasFromLocalStorage();
  }

  setSucursal(sucursal: any) {
    if (!sucursal) return;
    this._sucursal = sucursal;
    localStorage.setItem('lubrikuv-Sucursal', JSON.stringify(this._sucursal));
  }

  actualizarElementosBuscadorMenu(routes: any) {
    const listaTemp: any[] = [];
    for (const item of this.routes) {
      if (item.children) {
        for (const subItem of item.children) {
          listaTemp.push(subItem);
        }
      } else {
        listaTemp.push(item);
      }
    }
    this.routesForSearch = listaTemp;
  }

  private loadRutasFromLocalStorage() {
    const rutasStr = localStorage.getItem('rutas');
    if (rutasStr) {
      const rutas = JSON.parse(rutasStr);
      this.rutasSubject.next(rutas);
    }
  }

  /**
   * Redirige al usuario a la pantalla inicial del sistema.
   */
  goToHome(): void {
    if (this.routes.length == 0) {
      setTimeout(() => {
        this.goToHome();
      }, 100);
      if (this.routes[0]) {
        if (this.routes[0].children) {
          this.router.navigate(this.routes[0].children[0].route);
        } else {
          this.router.navigate(this.routes[0].route);
        }
      }
      return;
    }

    this.router.navigate([this.routes[0].route ?? this.routes[0].children[0].route]);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(this.config.apiUrl + this.controller + "login", credenciales, this.httpOptions)
      .pipe(
        map((resp: any) => {
          localStorage.setItem('id', resp.usuario.id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          this.usuario = resp.usuario;
          localStorage.setItem('sucursal_id', "");
          return resp.usuario;
        })
      );
  }

  loginAsUser(idUsuario: number): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + `login-as-user/${idUsuario}`, this.headers)
      .pipe(
        map((resp: any) => {
          localStorage.setItem('id', resp.usuario.id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          this.usuario = resp.usuario;
          localStorage.setItem('sucursal_id', "");
          return resp.usuario;
        })
      );
  }

  isLogged(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "is-logged", this.headers)
      .pipe(
        map((resp: any) => {
          if (resp.usuario) {
            localStorage.setItem('id', resp.usuario.id);
            localStorage.setItem('token', resp.token);
            localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            this.usuario = resp.usuario;
            localStorage.setItem('sucursal_id', "");
          }
          return resp;
        })
      );
  }

  getPaymentState(id: number | null = null): Observable<any> {
    return this.http.get(this.config.apiUrl + `kpagos/comprobar-suscripcion-local/${id}`, this.headers);
  }

  checkPaymentState(id: number | null = null): Observable<any> {
    return this.http.get(this.config.apiUrl + `kpagos/comprobar-suscripcion/${id}`, this.headers);
  }

  getMenu(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "obtener-menu", this.headers);
  }

  saveSesion(token: string, usuario: any): void {
    localStorage.setItem("token", token);
    localStorage.setItem("id", usuario.id);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
  }

  clearSesion(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.usuario = null;
    localStorage.removeItem("id");
    localStorage.removeItem("sucursal_id");
    this.sucursalIndex = 0;
    this._sucursal = null;
    this.sucursales = [];
    //this.rutas = []
  }

  loadLocalSucursal(): number {
    try {
      const index = localStorage.getItem("sucursal_id") ?? "";
      if (!index) return 0;
      return parseInt(index);
    } catch (_) {
      localStorage.setItem("sucursal_id", "");
      return 0;
    }
  }

  saveSucursal(id: number): void {
    if (!id) return;
    localStorage.setItem("sucursal_id", `${id}`);
  }

  restablecer(credenciales: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': credenciales.token
    });
    return this.http.post(this.config.apiUrl + this.controller + "restablecer", credenciales, { headers });
  }

  recuperar(credenciales: any): Observable<any> {
    return this.http.post(this.config.apiUrl + this.controller + "recuperar-pass", credenciales, this.httpOptions);
  }

  changePassword(pass: any): Observable<any> {
    return this.http.post(this.config.apiUrl + this.controller + "change-password", pass, this.headers);
  }

  getLatestVersion(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "get-latest-version", this.headers);
  }

  getLatestVersionMd(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "get-latest-version-md", this.headers);
  }

  getHomeOptions(): Observable<any> {
    return this.http.get(this.config.apiUrl + this.controller + "get-home-options", this.headers);
  }

  cambiarPlanPrueba(tipo: number): Observable<any> {
    return this.http.put(this.config.apiUrl + this.controller + "cambiar-plan-prueba", { tipo }, this.headers);
  }

  obtenerEstadoSuscripcion(id: number | null = null) {
    return new Promise((resolve, reject) => {
      this.getPaymentState(id).subscribe({
        next: (res: any) => {
          if (!res.suscripcion_activa) {
            this.checkPaymentState(id).subscribe({
              next: (res: any) => {
                if (!res.suscripcion_activa) resolve(false);
                else resolve(true);
              }, error: (err: any) => {
                resolve(false);
              }
            });
          } else {
            resolve(true);
          }
        }, error: (err: any) => {
          resolve(false);
        }
      });
    })
  }
}