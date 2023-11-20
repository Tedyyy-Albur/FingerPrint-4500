import { Component, OnDestroy, OnInit } from '@angular/core';
import { FingerprintReader, SampleFormat, DeviceConnected, DeviceDisconnected, SamplesAcquired, AcquisitionStarted, AcquisitionStopped } from "@digitalpersona/devices";
import './core/modules/WebSdk'
import { ServicesService } from './services/services.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'huellaYT';
  listaFinger: any;
  img: string = "";
  huellasRegister: any[] = [];
  token: any;

  private reader: FingerprintReader;
  constructor(private services: ServicesService, private rutaActiva: ActivatedRoute ) {
    this.reader = new FingerprintReader();
    console.log(rutaActiva.snapshot.paramMap.get('id'));
    
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
    this.token = window.location.pathname;
    this.token = this.token.replace(/^\//g, '');
    console.log(this.token);
    

  }
  ngOnDestroy(): void {
    this.reader.off("DeviceConnected", this.onDeviceConnected);
    this.reader.off("DeviceDisconnected", this.onDeviceDisconnected);
    this.reader.off("AcquisitionStarted", this.onAcquisitionStarted);
    this.reader.off("AcquisitionStopped", this.onAcquisitionStopped);
    this.reader.off("SamplesAcquired", this.onSamplesAcquired);

  }


  obtenerDevices() {
    Promise.all([
      this.reader.enumerateDevices()
    ]).then(result => {
      this.listaFinger = result[0];
      console.log(this.listaFinger[0]);
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
    this.services.busquedaPorHuella(this.img,this.token).subscribe(resp => {
      console.log(resp);
    })
  }

  guardarHuella() {
    console.log(this.huellasRegister);
    this.services.guardarHuellaAdmin(this.huellasRegister, this.token).subscribe(resp => {
    })
  }
  reiniciarHuellas(){
    this.huellasRegister = [];
    this.start();
  }
}
