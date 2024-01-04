import { Component, OnDestroy, OnInit } from '@angular/core';
import { FingerprintReader, SampleFormat, DeviceConnected, DeviceDisconnected, SamplesAcquired, AcquisitionStarted, AcquisitionStopped } from "@digitalpersona/devices";
import './core/modules/WebSdk'
import { ServicesService } from './services/services.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'huellaYT';
  listaFinger: any;
  img: string = '';
  huellasRegister: any[] = [];
  token: any;
  idPaciente: any;
  loading: boolean = false;
  mensajeEnviar: string = "";

  private reader: FingerprintReader;
  constructor(private services: ServicesService, private rutaActiva: ActivatedRoute, private cookieService: CookieService) {
    this.reader = new FingerprintReader();

  }

  private onDeviceConnected = (event: DeviceConnected) => { };
  private onDeviceDisconnected = (event: DeviceDisconnected) => { };
  private onAcquisitionStarted = (event: AcquisitionStarted) => {
    console.log("El evento onAcquis");
  }
  private onAcquisitionStopped = (event: AcquisitionStopped) => {
    console.log("El evento onAcquisStoped");
  }

  private onSamplesAcquired = (event: SamplesAcquired) => {
    if (this.huellasRegister.length == 4) {
      console.log("completo");
      this.end();
    } else {
      this.img = "";
      console.log("El evento Adquisicion de imagen");
      this.img += event.samples[0];
      this.repairBase64();
    }


  }
  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.reader.on("DeviceConnected", this.onDeviceConnected);
    this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
    this.reader.on("AcquisitionStarted", this.onAcquisitionStarted);
    this.reader.on("AcquisitionStopped", this.onAcquisitionStopped);
    this.reader.on("SamplesAcquired", this.onSamplesAcquired);
    this.obtenerDevices();

    //OBTENER EL IDPACIENTE
    const url = window.location.pathname.substring(1);
    const valor = url.split('id')[1];
    this.idPaciente = valor.split('/')[1];

    console.log(this.idPaciente + ' V9');

    //OBTENER EL TOKEN 
    const toke = window.location.pathname.substring(0);
    const valorToken = toke.split('/')[1];
    this.token = valorToken;

  }
  ngOnDestroy(): void {
    this.reader.off("DeviceConnected", this.onDeviceConnected);
    this.reader.off("DeviceDisconnected", this.onDeviceDisconnected);
    this.reader.off("AcquisitionStarted", this.onAcquisitionStarted);
    this.reader.off("AcquisitionStopped", this.onAcquisitionStopped);
    this.reader.off("SamplesAcquired", this.onSamplesAcquired);
    this.end();
  }


  obtenerDevices() {
    Promise.all([
      this.reader.enumerateDevices()
    ]).then(result => {
      this.listaFinger = result[0];
      this.start();
      console.log('Obtener devices: ' + result);
    }).catch((error) => {
      console.log(error);
    })
  }
  start() {
    this.img = "";
    this.reader.startAcquisition(SampleFormat.PngImage, this.listaFinger[0])
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  end() {
    this.reader.stopAcquisition(this.listaFinger[0])
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  repairBase64() {
    var strImage;
    strImage = this.img;
    strImage = strImage.replace(/_/g, "/");
    strImage = strImage.replace(/-/g, "+");
    this.img = strImage;
    this.huellasRegister.push(this.img)
  }

  buscarPaciente() {
    this.mensajeEnviar = "Buscando"
    this.loading = true;
    this.services.busquedaPorHuella(this.img, this.token).subscribe(resp => {
      if (resp.estatus == 1) {
        this.loading = false;
        this.alertaExito();
        window.open('http://ec2-54-146-2-42.compute-1.amazonaws.com/?nombre=' + resp.informacion.paciente.nombre + '&?pApellido=' + resp.informacion.paciente.primerApellido);
        window.close();
      } else if (resp.valorError == 0) {
        this.loading = false;
        this.error(resp.error);
      } else {
        this.loading = false;
        this.alertaError();
      }
    });

  }

  guardarHuella() {
    console.log(this.huellasRegister);
    this.mensajeEnviar = "Guardando"
    if (this.huellasRegister.length != 0) {

      this.loading = true;
      this.services.guardarHuellaAdmin(this.huellasRegister, this.token, this.idPaciente).subscribe(resp => {
        if (resp.estatus == 1) {
          window.open('http://ec2-54-146-2-42.compute-1.amazonaws.com/pacientes/' + this.idPaciente);
          window.close();
          this.loading = false;
        } else if (resp.valorError == 0) {
          this.loading = false;
          this.error(resp.error);
        } else {

          this.loading = false;
          this.errorGuardado();
        }
      });

    } else {
      this.loading = false;
      this.errorGuardado();
    }
  }

  reiniciarHuellas() {
    this.huellasRegister = [];
    this.start();
  }

  alertaError() {
    Swal.fire({
      title: "Paciente no encontrado",
      text: "Vuelva a intentarlo con otra huella!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Intentar de nuevo"
    }).then((result) => {
      if (result.isConfirmed) {
        this.img = "";
        this.huellasRegister = [];
      }
    });
  }
  alertaExito() {
    Swal.fire({
      icon: "success",
      title: "Encontrado Correctamente",
      showConfirmButton: false,
      timer: 3500
    });
  }
  errorGuardado() {
    Swal.fire({
      title: "Huellas no registradas",
      text: "Agrega al menos una huella!",
      icon: "question"
    });
  }
  error(error: any) {
    Swal.fire({
      title: error.name,
      text: error.message,
      icon: "error"
    });
  }
}
