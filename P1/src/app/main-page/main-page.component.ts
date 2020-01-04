import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  constructor() {}

  details: any = [];

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      this.details.push({
        name: "sai",
        age: "24",
        company: "infosys",
        role: "system engineer"
      });
    }
  }
}
