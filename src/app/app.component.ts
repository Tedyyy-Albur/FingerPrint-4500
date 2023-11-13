import { Component, OnDestroy, OnInit } from '@angular/core';
import { FingerprintReader, SampleFormat, DeviceConnected,DeviceDisconnected,SamplesAcquired, AcquisitionStarted, AcquisitionStopped } from "@digitalpersona/devices";
import './core/modules/WebSdk'
import { ServicesService } from './services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'huellaYT';
  listaFinger:any;
  img:string = "";

  private reader: FingerprintReader;
  constructor(private services: ServicesService){
    this.reader = new FingerprintReader();
  }

  private onDeviceConnected = (event: DeviceConnected) => { };
  private onDeviceDisconnected = (event: DeviceDisconnected) => { };
  private onAcquisitionStarted = (event: AcquisitionStarted) => {
    console.log("El evento onAcquis");
    console.log(event);
  }
  private onAcquisitionStopped = (event: AcquisitionStopped) => {
    console.log("El evento onAcquisStoped");
    console.log(event);
  }
 
  private onSamplesAcquired = (event: SamplesAcquired) => {
    this.img="";
    console.log("El evento Adquisicion de imagen");
    this.img += event.samples[0];
  
    this.repairBase64();
  }
  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.reader.on("DeviceConnected", this.onDeviceConnected);
    this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
    this.reader.on("AcquisitionStarted", this.onAcquisitionStarted);
    this.reader.on("AcquisitionStopped", this.onAcquisitionStopped);
    this.reader.on("SamplesAcquired", this.onSamplesAcquired);
    this.obtenerDevices();
      
  }
  ngOnDestroy(): void {
    this.reader.off("DeviceConnected", this.onDeviceConnected);
    this.reader.off("DeviceDisconnected", this.onDeviceDisconnected);
    this.reader.off("AcquisitionStarted", this.onAcquisitionStarted);
    this.reader.off("AcquisitionStopped", this.onAcquisitionStopped);
    this.reader.off("SamplesAcquired", this.onSamplesAcquired);
      
  }

 
  obtenerDevices(){
    Promise.all([
      this.reader.enumerateDevices()
    ]).then(result => {
      this.listaFinger = result[0];
      console.log(this.listaFinger[0]);
    }).catch((error) => {
      console.log(error);
    })
  }
  start(){
    this.img="";
    this.reader.startAcquisition(SampleFormat.PngImage, this.listaFinger[0])
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  end(){
    this.reader.stopAcquisition(this.listaFinger[0])
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
      
    })

  }
  repairBase64(){
    var strImage;
    strImage = this.img;
    strImage = strImage.replace(/_/g,"/");
    strImage = strImage.replace(/-/g,"+");
    this.img = strImage;
    console.log(this.img);
  }

  guardarHuella(){
    this.services.guardar(this.img).subscribe(resp => {
      console.log(resp);
    })
  }
}
