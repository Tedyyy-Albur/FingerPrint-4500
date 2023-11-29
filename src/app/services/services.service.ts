import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  //private url = 'http://ec2-54-146-2-42.compute-1.amazonaws.com:8080/api/';
  private url = 'http://localhost:8080/api/';

  guardarHuellaAdmin(img: any[], token: any, idPaciente:any){
    const endpoint = 'v1/administrativo/paciente/registrar-huella-paciente-admin';
    let datos = {
      idPaciente: idPaciente,
      huellasBase64: img
    }
    console.log(datos);
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    });
    return this.http.post(this.url + endpoint, datos, {headers});
  }
  busquedaPorHuella(img: any, token: any): Observable<any>{
    const endpoint = 'v1/administrativo/paciente/consultaPacientePorHuellaDigitalAdmin';
    let datos = {
      huellaBase64: img
    }
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token, 
    });
    return this.http.post(this.url + endpoint, datos, {headers});
  }

}
