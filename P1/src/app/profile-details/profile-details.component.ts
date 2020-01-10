import { Component, OnInit, ViewChild } from "@angular/core";
import { } from "googlemaps";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.css"]
})
export class ProfileDetailsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }
  texto: string = "Wenceslau Braz - Cuidado com as cargas";
  lat: number = 17.440081;
  lng: number = 78.348915;
  zoom: number = 15;
  choosedProfId = 0;
  imgSrc = "../../assets/Images/customerProfilePhoto_Male.png";
  imgurl: any;
  details: any = [];
  profileName: string = "";
  profileAge: string = "";
  profileCountry: string = "";
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.choosedProfId = id;
    });
    for (let i = 0; i < 50; i++) {
      this.details.push({ "id": i + 1, "Name": "sai marella", "Age": i, "Country": "India", "TotalOrders": "30" });
    }
    this.details.push({ "id": "51", "Name": "Sruthi Chintala", "Age": "23", "Country": "India", "TotalOrders": "90" });
    this.profileAge = this.details[this.choosedProfId - 1].Age;
    this.profileName = this.details[this.choosedProfId - 1].Name;
    this.profileCountry = this.details[this.choosedProfId - 1].Country;
    $(document).ready(function () {
      $("#CustProfile").click(function () {
        $("#CustOrders").css("color", "#069");
        $("#EditCust").css("color", "#069");
        $("#CustProfile").css("color", "wheat");
        $("#EditTab").hide();
        $("#OrderTab").hide();
        $("#CustomerProfileTab").show();
        $("#mapLocation").show();
      });
      $("#EditCust").click(function () {
        $("#CustOrders").css("color", "#069");
        $("#CustProfile").css("color", "#069");
        $("#EditCust").css("color", "wheat");
        $("#EditTab").show();
        $("#OrderTab").hide();
        $("#CustomerProfileTab").hide();
        $("#mapLocation").hide();
      });
      $("#CustOrders").click(function () {
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

  profileNavigate() {
    console.log(this.choosedProfId);
    this.router.navigate(["/main"]);
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
      $(document).ready(function () {
        $("#userEditImg").css({ width: "50%", height: "200px" });
      });
    }
  }

  chartsNavigate() {
    this.router.navigate(['/charts']);
  }
}
