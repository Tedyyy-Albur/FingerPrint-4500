import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  private url = 'http://ec2-54-146-2-42.compute-1.amazonaws.com:8080/api/';

  guardar(img: any[]){
    const endpoint = 'v1/administrativo/paciente/registrar-huella-paciente-admin';
    let datos = {
      idPaciente: 325,
      huellasBase64: img
    }
    console.log(datos);
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': 'eyJhbGciOiJFQ0RILUVTK0ExMjhLVyIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJraWQiOiJsbGF2ZV9yZWNpYmUiLCJjdHkiOiJKV1QiLCJlcGsiOnsia3R5IjoiRUMiLCJ4IjoialU1ZWY4d0c4S3d2MHZqMzFjeUNmUGRmUWlJRFc0aHR4c2pWTVl2UndybyIsInkiOiJLZFJVTHdrQzZFR2l5LUFzS0VHOWNVQklDOTQ4RTRzZDdkTC1EdklIU0cwIiwiY3J2IjoiUC0yNTYifX0.7xn-mjdedzjKsqWbxy4T2Ot84GHVQstLYEhTn4tBQtcDRw36-DyL6Q.PyKa_jxkcWFv0NtoypCqJw.6GCB-Um0B5d4CWMfcOrWy2GPB1__SEsq0LpBb7RwDvbAeXzxmmND3nMTMfuq90tD7O28Y6ntT7E2OO08mEYyIpL8ytbLTIPZKs9ELZlKc-k9qoo4Ew0R_4wHJ3SGp9DxLeiSxADnQ0FF3StCB3WW-f5d2bA2dH9UZFkug8FvptTOmyFeU4XvRO0y0ht84QUpDHqZ-VJMYS1RLo969eXEig8r7oA2GKWARNhhHwX5MWHWRpsW4KHxtK1hM8AL7ZF4ufynv505y3jXfYjIWvUiqCPheB1z4GzZPFjoN6jyQBkRg6ENaHmKh5kTnSlAm5Lp7TTDkZ6vu4AiAN1epq3ZZcJABap3OLcoIv5NtNQs0-y8bUzxQmMrSBIU8w8yl1UfRMET7672thaPzKOCXNsofg.n9oVtVJYVIC9bTtSkryMFg', // Ajusta según el nombre de tu encabezado
    });
    return this.http.post(this.url + endpoint, datos, {headers});
  }
  busquedaPorHuella(img: any){
    const endpoint = 'v1/administrativo/paciente/consultaPacientePorHuellaDigitalAdmin';
    let datos = {
      huellaBase64: img
    }
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': 'eyJhbGciOiJFQ0RILUVTK0ExMjhLVyIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJraWQiOiJsbGF2ZV9yZWNpYmUiLCJjdHkiOiJKV1QiLCJlcGsiOnsia3R5IjoiRUMiLCJ4IjoialU1ZWY4d0c4S3d2MHZqMzFjeUNmUGRmUWlJRFc0aHR4c2pWTVl2UndybyIsInkiOiJLZFJVTHdrQzZFR2l5LUFzS0VHOWNVQklDOTQ4RTRzZDdkTC1EdklIU0cwIiwiY3J2IjoiUC0yNTYifX0.7xn-mjdedzjKsqWbxy4T2Ot84GHVQstLYEhTn4tBQtcDRw36-DyL6Q.PyKa_jxkcWFv0NtoypCqJw.6GCB-Um0B5d4CWMfcOrWy2GPB1__SEsq0LpBb7RwDvbAeXzxmmND3nMTMfuq90tD7O28Y6ntT7E2OO08mEYyIpL8ytbLTIPZKs9ELZlKc-k9qoo4Ew0R_4wHJ3SGp9DxLeiSxADnQ0FF3StCB3WW-f5d2bA2dH9UZFkug8FvptTOmyFeU4XvRO0y0ht84QUpDHqZ-VJMYS1RLo969eXEig8r7oA2GKWARNhhHwX5MWHWRpsW4KHxtK1hM8AL7ZF4ufynv505y3jXfYjIWvUiqCPheB1z4GzZPFjoN6jyQBkRg6ENaHmKh5kTnSlAm5Lp7TTDkZ6vu4AiAN1epq3ZZcJABap3OLcoIv5NtNQs0-y8bUzxQmMrSBIU8w8yl1UfRMET7672thaPzKOCXNsofg.n9oVtVJYVIC9bTtSkryMFg', // Ajusta según el nombre de tu encabezado
    });
    return this.http.post(this.url + endpoint, datos, {headers});
  }

}
