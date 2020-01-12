import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as $ from "jquery";
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router'
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router) { }
  TopCustomers: boolean = false;
  AllCustomers: boolean = false;
  details: any = [];
  pageNo = 0;
  prevButton: boolean = true;
  TopCustomerDetails: any = [];
  displayedColumns: string[] = ['Name', 'Age', 'Country', 'TotalOrders'];
  dataSource = new MatTableDataSource(this.details);
  tempNameData: any = [];
  tempAgeData: any = [];
  tempCountryData: any = [];
  CountryFilter = "Country Filter"

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    for (let i = 0; i < 50; i++) {
      this.details.push({ "id": i + 1, "Name": "sai marella", "Age": i, "Country": "India", "TotalOrders": "30" });
    }
    this.details.push({ "id": "51", "Name": "Sruthi Chintala", "Age": "23", "Country": "India", "TotalOrders": "90" });
    this.tempNameData = this.details;
    this.tempAgeData = this.details;
    this.tempCountryData = this.details;
    for (let i = 0; i < 6; i++) {
      this.TopCustomerDetails.push({ "id": this.details[i].id, "Name": this.details[i].Name, "Age": this.details[i].Age, "Country": this.details[i].Country, "TotalOrders": this.details[i].TotalOrders })
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    $(document).ready(function () {
      $("#login").click(function () {
        $("#LoginModal").animate({ top: "40px" });

        $("#LoginModal").animate({ left: "60px" });
      });
      $("#logo").click(function () {
        $("li").toggle("slow");
      })
      $("#TopCustomerButton").click(function () {
        $("#TopCustomerButton").css("color", "teal");
        $("#AllCustomerButton").css("color", "black");
        $("#CustomerDataTable").hide();
        $("#TopCustomerCards").show();
        $("#previousButton").show();
      })

      $("#AllCustomerButton").click(function () {
        $("#AllCustomerButton").css("color", "teal");
        $("#TopCustomerButton").css("color", "black");
        $("#CustomerDataTable").show();
        $("#TopCustomerCards").hide()
        $("#previousButton").hide();

      })

      $("#previousCustomersDetails").click(function () {
        $("#TopCustomerCards").animate({ left: "30px" });
      })
      $("#nextCustomersDetails").click(function () {
        $("#TopCustomerCards").animate({ right: "30px" });
      })

    });

    $(window).on('resize', function () {
      var win = $(window);
      if (win.width() <= 350) {


        $(".login").css("width", "230px");
        $(".modal-body").css("left", "25px");
      }
      else if (win.width() <= 450) {

        $(".login").css("width", "270px");

      }
      else {
        $(".login").css("width", "400px");
      }
      if (win.width() > 750 && win.width() < 850) {
        $("#search").css("width", "170px");
      }

      else {
        $("#search").css("width", "250px");
      }
    })



  }
  viewProfile(data: any) {
    this.router.navigate(['/customer', data.id]);
  }
  nextCustomersDetails() {
    $("#TopCustomerCards").fadeOut("slow");
    console.log(Math.round(this.details.length / 6));
    if (this.pageNo < (Math.round(this.details.length / 6))) {
      this.pageNo++;
      var nextCustomer: any = []; $("#TopCustomerCards").fadeOut();
      var limit = 0;
      if ((this.pageNo + 1) * 6 > this.details.length) {
        limit = this.details.length;
      }
      else {
        limit = (this.pageNo + 1) * 6;
      }
      for (let i = 6 * this.pageNo; i < limit; i++) {
        nextCustomer.push({ "id": this.details[i].id, "Name": this.details[i].Name, "Age": this.details[i].Age, "Country": this.details[i].Country, "TotalOrders": this.details[i].TotalOrders });
      }
      this.TopCustomerDetails = nextCustomer;
      $("#TopCustomerCards").fadeIn("slow");
    }

  }
  profileNavigate() {
    console.log("hi");
    this.router.navigate(["/main"]);
  }
  previousCustomersDetails() {
    $("#TopCustomerCards").fadeOut("slow");
    if (this.pageNo >= 1) {
      this.pageNo--;
      var prevCustomer: any = [];
      for (let i = 6 * (this.pageNo); i < (this.pageNo + 1) * 6; i++) {
        prevCustomer.push({ "id": this.details[i].id, "Name": this.details[i].Name, "Age": this.details[i].Age, "Country": this.details[i].Country, "TotalOrders": this.details[i].TotalOrders });
      }
      this.TopCustomerDetails = prevCustomer;
    }
    $("#TopCustomerCards").fadeIn("slow");
  }
  applyNameFilter(filterValue: string) {
    if (filterValue.length > 0) {

      this.tempNameData = this.details;
      this.tempNameData = this.details.filter(e => e.Name.toLowerCase().includes(filterValue))
      console.log(this.details);
      this.dataSource = this.tempNameData;
    }
    else {
      this.tempNameData = this.details;
      this.dataSource = this.tempNameData;
    }

    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyAgeFilter(filterValue: string) {
    if (filterValue.length > 0) {

      this.tempAgeData = this.tempNameData;
      this.tempAgeData = this.tempNameData.filter(e => e.Age.toString().toLowerCase().includes(filterValue))
      console.log(this.tempAgeData);
      this.dataSource = this.tempAgeData;
    }
    else {
      this.tempAgeData = this.tempNameData;
      this.dataSource = this.tempAgeData;
    }
  }

  applyCountryFilter(filterValue: string) {
    this.CountryFilter = filterValue;
    if (filterValue != "none") {

      this.tempCountryData = this.tempAgeData;
      this.tempCountryData = this.tempAgeData.filter(e => e.Country.includes(filterValue))
      console.log("hi");
      console.log(this.tempCountryData);
      this.dataSource = this.tempCountryData;
    }
    else {
      this.tempCountryData = this.tempAgeData;
      this.dataSource = this.tempCountryData;
    }

    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  chartsNavigate() {
    this.router.navigate(["/charts"]);
  }
}
