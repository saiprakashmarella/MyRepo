import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule
} from "@angular/material";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { AgmCoreModule } from "@agm/core";
import { FormsModule } from '@angular/forms';
import { PNFComponent } from './pnf/pnf.component';
import { ChartsComponent } from './charts/charts.component'
@NgModule({
  declarations: [AppComponent, MainPageComponent, ProfileDetailsComponent, routingComponents, PNFComponent, ChartsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,

    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCWedEqCJBj8uf8ZHzD6z8a7B3vsXwc9XI"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
