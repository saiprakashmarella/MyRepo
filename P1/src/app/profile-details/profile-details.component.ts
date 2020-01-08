import { Component, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
declare var ol:any;
import olMap from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ';


@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.css"]
})
export class ProfileDetailsComponent implements OnInit {
  constructor() {}
  texto: string = "Wenceslau Braz - Cuidado com as cargas";
  lat: number = 17.440081;
  lng: number = 78.348915;
  zoom: number = 15;

 
  
  ngOnInit() {
    
}
}
