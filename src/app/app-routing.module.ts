import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HuellaComponent } from './huella/huella.component';

const routes: Routes = [
  { path: 'idPaciente/:id', component: HuellaComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
