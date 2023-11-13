import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  private url = 'http://ec2-54-146-2-42.compute-1.amazonaws.com:8080/api/';

  guardar(img: string){
    const endpoint = 'v1/administrativo/paciente/registrar-huella-paciente';
    let datos = {
      idPaciente:325,
      huellaBase64: img
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Auth-Token': 'eyJhbGciOiJFQ0RILUVTK0ExMjhLVyIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJraWQiOiJsbGF2ZV9yZWNpYmUiLCJjdHkiOiJKV1QiLCJlcGsiOnsia3R5IjoiRUMiLCJ4IjoiLXhmQkg0OXFrcnJ1Q3lPckNVT3NSanE4WWppSV9jeXpmaWpfVGhWb2tJSSIsInkiOiJwSDNvdXBHakhHQ1VXbFRzVVp5YnYzcjc1TEN4dUhKbHNpNEJpa1JFWDQ0IiwiY3J2IjoiUC0yNTYifX0.CeIMwHSRmcZJxzvoG03-HEFIQ-AZ37ymhaPZNeStldotU7hVNuvSZQ.rGAqe4Pi5219P7yAJWJWBA.Ynv3XdT6F6bY0xEXVqqUxXUawz6iyVZxwYpuQFNcC75fvAa8aUv69Nd7F_8kopiCSxlG_zOoh8A9CmFNbxgVSzez2gC3TKKHB2kniIfWGV6stXbOKsvT3STTxGnxWGRaonr1T87JJXA3f-6phPeD_rK4ZC0ldApdUraNZG_6k_9cWdaCiKkr2wFwEChVLpEPs-6YsIvdd6gjH4hTma7x1kh1P3neYjzI5SzZcKH7HVwk2604OT45Yhpxw-SAzJzwERpFs3UnBg6Ab_If12M9JjpYF-0pYWktwSHOLprBS9ahfsi4o9kxPX4lid_fpZV4kE49Rb8bS5I0zQD_Dsu1vyBNel2vJeis-tFIf07NR2SeaAeWq4BqyBHg9LbiO4gNxbBUWWt9qyK-PpkAu22s3A.S9Vc52-3-6pgUWdAbNQGcA', // Ajusta según el nombre de tu encabezado
    });
    return this.http.post(this.url + endpoint, datos);
  }

}
