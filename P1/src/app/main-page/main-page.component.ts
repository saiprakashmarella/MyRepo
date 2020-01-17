import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as $ from "jquery";
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router'
import { CustomerService } from 'src/Services/CustomerService.service';
import { Observable } from 'rxjs';
import { ICustomer } from 'src/Models/ICustomer';
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router, private _customerService: CustomerService) { }
  TopCustomers: boolean = false;
  AllCustomers: boolean = false;
  details: any = [];
  pageNo = 0;
  error: any;
  prevButton: boolean = true;
  TopCustomerDetails: any = [];
  AddCustomer: boolean = false;
  displayedColumns: string[] = ['Name', 'Age', 'Country', 'TotalOrders'];
  dataSource = new MatTableDataSource(this.details);
  CountryFilter = "Country Filter"
  tempdata: any = [];
  Filtered: boolean = false;
  filtername = "";
  filterAge = "";
  filterCountry = "";
  tempLength = 0;
  AllCustomersData = [];
  originalLength = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.jquerycode();
    this.getAllCustomers();
    this.tempdata = this.details;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.gettestdata();
    this.getTopCustomers();
  }

  jquerycode() {
    $(document).ready(function () {

      $("#login").click(function () {
        $("#LoginModal").animate({ top: "40px" });

        $("#LoginModal").animate({ left: "60px" });
      });
      $("#logo").click(function () {
        $("li").toggle("slow");
      })
      $("#TopCustomerButton").click(function () {
        $("#AddCustomerButton").css("color", "black");
        $("#AddCustomerSection").hide();
        $("#AllCustomerButton").css("color", "black");
        $("#CustomerDataTable").hide();
        $("#TopCustomerButton").css("color", "teal");
        $("#TopCustomerCards").show();
        $("#previousButton").show();
      })
      $("#AllCustomerButton").click(function () {
        $("#TopCustomerButton").css("color", "black");
        $("#TopCustomerCards").hide();
        $("#previousButton").hide();

        $("#AddCustomerButton").css("color", "black");
        $("#AddCustomerSection").hide();
        $("#AllCustomerButton").css("color", "teal");
        $("#CustomerDataTable").show();
      })
      $("#AddCustomerButton").click(function () {
        $("#AllCustomerButton").css("color", "black");
        $("#CustomerDataTable").hide();
        $("#TopCustomerButton").css("color", "black");
        $("#TopCustomerCards").hide();
        $("#previousButton").hide();
        $("#AddCustomerButton").css("color", "teal");
        $("#AddCustomerSection").show();
      })
      $(window).resize(function () {
        var h = $(this).height();
        var w = $(this).width();
        $("html").css({ "height": h, "width": w })
        $(".navbar-light").css("width", w);
        $("#TopCustomerCards").css("color", "white");

      })

    });


  }
  gettestdata() {
    for (let i = 0; i < 50; i++) {
      this.details.push({ "id": i + 1, "Name": "sai marella", "Age": i, "Country": "India", "TotalOrders": "30" });
    }
    this.details.push({ "id": "51", "Name": "Sruthi Chintala", "Age": "23", "Country": "India", "TotalOrders": "90" });

  }
  getTopCustomers() {
    for (let i = 0; i < 6; i++) {
      this.TopCustomerDetails.push({ "id": this.details[i].id, "Name": this.details[i].Name, "Age": this.details[i].Age, "Country": this.details[i].Country, "TotalOrders": this.details[i].TotalOrders })
    }

  }
  getAllCustomers() {
    this._customerService.getAllCustomers()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.AllCustomersData.push({ "cust_id": data[i].cid, "customer_name": data[i].cname, "cust_address": data[i].caddress, "cust_Country": data[i].ccountry, "img_path": data[i].img_path, "createddate": data[i].createddate, "updateddate": data[i].updateddate, "phno": data[i].phno })
        }


        console.log(data)
      },
        error => this.error = error
      );

  }
  viewProfile(data: any) {
    this.router.navigate(['/customer', data.id]);
  }
  nextCustomersDetails() {

    console.log(Math.round(this.details.length / 6));
    if (this.pageNo < (Math.round(this.details.length / 6))) {
      $("#TopCustomerCards").fadeOut("slow");
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

    if (this.pageNo >= 1) {
      $("#TopCustomerCards").fadeOut("slow");
      this.pageNo--;
      var prevCustomer: any = [];
      for (let i = 6 * (this.pageNo); i < (this.pageNo + 1) * 6; i++) {
        prevCustomer.push({ "id": this.details[i].id, "Name": this.details[i].Name, "Age": this.details[i].Age, "Country": this.details[i].Country, "TotalOrders": this.details[i].TotalOrders });
      }
      this.TopCustomerDetails = prevCustomer;
    }
    $("#TopCustomerCards").fadeIn("slow");
  }

  applyNameFilter(filtervalue: string) {
    this.filtername = filtervalue;
    this.tempdata = this.details;
    if (this.filtername.length > 0 || this.filterCountry.length > 0 || this.filterAge.length > 0) {
      this.Filtered = true
    }
    else {
      this.Filtered = false;
    }
    if (this.filtername.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Name.toLowerCase().includes(this.filtername))
    }
    if (this.filterAge.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Age.toString().includes(this.filterAge))
    }
    if (this.filterCountry.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Country.includes(this.filterAge));
    }
    this.tempLength = this.tempdata.length;
    this.originalLength = this.details.length;

    console.log("temp:" + this.tempdata.length);
    console.log("main:" + this.details.length);
    this.dataSource = this.tempdata;

  }

  applyAgeFilter(filtervalue: string) {
    this.filterAge = filtervalue;
    this.tempdata = this.details;
    if (this.filtername.length > 0 || this.filterCountry.length > 0 || this.filterAge.length > 0) {
      this.Filtered = true
    }
    else {
      this.Filtered = false;
    }
    if (this.filtername.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Name.toLowerCase().includes(this.filtername))
    }
    if (this.filterAge.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Age.toString().toLowerCase().includes(this.filterAge))
    }
    if (this.filterCountry.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Country.includes(this.filterAge));
    }

    this.tempLength = this.tempdata.length;
    this.originalLength = this.details.length;
    console.log("temp:" + this.tempdata.length);
    console.log("main:" + this.details.length);
    this.dataSource = this.tempdata;
  }

  applyCountryFilter(filtervalue: string) {
    this.filterCountry = filtervalue;
    this.tempdata = this.details;
    this.CountryFilter = filtervalue;

    if (this.filtername.length > 0 || this.filterCountry.length > 0 || this.filterAge.length > 0) {
      this.Filtered = true
    }
    else {
      this.Filtered = false;
    }
    if (this.filtername.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Name.toLowerCase().includes(this.filtername))
    }
    if (this.filterAge.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Age.toString().includes(this.filterAge))
    }
    if (this.filterCountry.length > 0) {
      this.tempdata = this.tempdata.filter(e => e.Country.includes(this.filterCountry));
    }

    this.tempLength = this.tempdata.length;
    this.originalLength = this.details.length;

    console.log("temp:" + this.tempdata.length);
    console.log("main:" + this.details.length);
    this.dataSource = this.tempdata;
  }
  chartsNavigate() {
    this.router.navigate(["/charts"]);
  }
  MainPageNavigate() {
    this.router.navigate(["/main"]);
  }
}
