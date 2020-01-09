import { Component, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
declare var ol: any;
import olMap from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ";

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

  imgSrc = "../../assets/Images/customerProfilePhoto_Male.png";
  imgurl: any;

  ngOnInit() {
    $(document).ready(function() {
      $("#CustProfile").click(function() {
        $("#CustOrders").css("color", "#069");
        $("#EditCust").css("color", "#069");
        $("#CustProfile").css("color", "wheat");
        $("#EditTab").hide();
        $("#OrderTab").hide();
        $("#CustomerProfileTab").show();
        $("#mapLocation").show();
      });
      $("#EditCust").click(function() {
        $("#CustOrders").css("color", "#069");
        $("#CustProfile").css("color", "#069");
        $("#EditCust").css("color", "wheat");
        $("#EditTab").show();
        $("#OrderTab").hide();
        $("#CustomerProfileTab").hide();
        $("#mapLocation").hide();
      });
      $("#CustOrders").click(function() {
        $("#CustProfile").css("color", "#069");
        $("#EditCust").css("color", "#069");
        $("#CustOrders").css("color", "wheat");
        $("#EditTab").hide();
        $("#OrderTab").show();
        $("#CustomerProfileTab").hide();
        $("#mapLocation").hide();
      });
    });
  }
  UpdateDetails(data: any) {
    console.log("Email:" + data.email);
    console.log("Image:" + this.imgSrc);
    console.log("Country:" + data.Country);
    console.log("State:" + data.State);
  }
  onImgChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      };

      reader.readAsDataURL(file);
      $(document).ready(function() {
        $("#userEditImg").css({ width: "50%", height: "200px" });
      });
    }
  }
}
