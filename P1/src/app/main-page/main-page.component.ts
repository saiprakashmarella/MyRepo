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
  TopCustomers:boolean=true;
  AllCustomers:boolean=false;
  details: any = [];
  displayedColumns: string[] = ['Name', 'Age', 'Country', 'TotalOrders'];
  dataSource = new MatTableDataSource(this.details);
 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
  
  ngOnInit() {
    for(let i=0;i<20;i++){
      this.details.push({"Name":"sai marella","Age":i,"Country":"India","TotalOrders":"30"});
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
      })
      
      $("#AllCustomerButton").click(function(){
        $("#AllCustomerButton").css("color","teal");
        $("#TopCustomerButton").css("color","black");
        $("#CustomerDataTable").show();
        $("#TopCustomerCards").hide()

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
  ShowTopCustomers(){
    this.TopCustomers=true;
    this.AllCustomers=false;
  }
  ShowAllCustomers(){
    this.AllCustomers=true;
    this.TopCustomers=false;
  }
  LoginModal() {
    console.log("hi");
  }
  applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}
