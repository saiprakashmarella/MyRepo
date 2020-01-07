import { Component, OnInit , ViewChild } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import * as $ from "jquery";
import { MatPaginator } from '@angular/material';
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  constructor() {}
  TopCustomers:boolean=false;
  AllCustomers:boolean=false;
  details: any = [];
  pageNo=0;
  prevButton:boolean=true;
  TopCustomerDetails:any=[];
  displayedColumns: string[] = ['Name', 'Age', 'Country', 'TotalOrders'];
  dataSource = new MatTableDataSource(this.details);
 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
  
  ngOnInit() {
    for(let i=0;i<50;i++){
      this.details.push({"Name":"sai marella","Age":i,"Country":"India","TotalOrders":"30"});
    }
    this.details.push({"Name":"Sruthi Chintala","Age":"23","Country":"India","TotalOrders":"90"});
    for(let i=0;i<6;i++){
      this.TopCustomerDetails.push({"Name":this.details[i].Name,"Age":this.details[i].Age,"Country":this.details[i].Country,"TotalOrders":this.details[i].TotalOrders})
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
    
    $(document).ready(function() {
      $("#login").click(function() {
        $("#LoginModal").animate({ top: "40px" });

        $("#LoginModal").animate({ left: "60px" });
      });
      $("#logo").click(function(){
        $("li").toggle("slow");
      })
      $("#TopCustomerButton").click(function(){
        $("#TopCustomerButton").css("color","teal");
        $("#AllCustomerButton").css("color","black");
        $("#CustomerDataTable").hide();
        $("#TopCustomerCards").show();
        $("#previousButton").show();
      })
      
      $("#AllCustomerButton").click(function(){
        $("#AllCustomerButton").css("color","teal");
        $("#TopCustomerButton").css("color","black");
        $("#CustomerDataTable").show();
        $("#TopCustomerCards").hide()
        $("#previousButton").hide();

      })
      
      $("#previousCustomersDetails").click(function(){
        $("#TopCustomerCards").animate({left:"30px"});
      })
      $("#nextCustomersDetails").click(function(){
        $("#TopCustomerCards").animate({right:"30px"});
      })
      
    });
    
    $(window).on('resize',function(){
      var win = $(window);
      if (win.width() <= 350) {
        
       
        $(".login").css("width","230px");
        $(".modal-body").css("left","25px");
      }
      else if(win.width()<=450){
        
        $(".login").css("width","270px");
        
      }
      else{
        $(".login").css("width","400px");
      }
      if(win.width()>750 && win.width()<850){
        $("#search").css("width","170px");
      }

      else{
        $("#search").css("width","250px");
      }
    })
    
      
    
  }
  nextCustomersDetails(){
    $("#TopCustomerCards").fadeOut("slow");
    console.log(Math.round(this.details.length/6));
    if(this.pageNo < (Math.round(this.details.length/6)) ){
    this.pageNo++;
    var nextCustomer:any=[];$("#TopCustomerCards").fadeOut();
    var limit=0;
    if((this.pageNo+1)*6>this.details.length){
      limit=this.details.length;
    }
    else{
      limit=(this.pageNo+1)*6;
    }
    for(let i=6*this.pageNo;i<limit;i++){
      nextCustomer.push({"Name":this.details[i].Name,"Age":this.details[i].Age,"Country":this.details[i].Country,"TotalOrders":this.details[i].TotalOrders});
    }
    this.TopCustomerDetails=nextCustomer;
    $("#TopCustomerCards").fadeIn("slow");
  }

  }
  previousCustomersDetails(){
    $("#TopCustomerCards").fadeOut("slow");
    if(this.pageNo >=1){
    this.pageNo--;
    var prevCustomer:any=[];
    for(let i=6*(this.pageNo);i<(this.pageNo+1)*6;i++){
      prevCustomer.push({"Name":this.details[i].Name,"Age":this.details[i].Age,"Country":this.details[i].Country,"TotalOrders":this.details[i].TotalOrders});
    }
    this.TopCustomerDetails=prevCustomer;
  }
  $("#TopCustomerCards").fadeIn("slow");
}
  applyFilter(filterValue:string){
    
    this.dataSource.filterPredicate = function(data:any, filter: string): boolean {
      return data.Name.toLowerCase().includes(filter)};
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}
