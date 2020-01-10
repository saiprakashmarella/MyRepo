import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/Libraries/CanvasJs/canvasjs.min';
import * as $ from 'jquery';
import { Router } from '@angular/router'


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private router: Router) { }
  dataset: any = [];

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.dataset.push({ "y": i + 1, "label": "A" })
    }
    let chart = new CanvasJS.Chart("BarchartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: this.dataset
      }]
    });

    chart.render();
    let chart2 = new CanvasJS.Chart("PiechartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping" },
          { y: 250, name: "Others" }
        ]
      }]
    });
    chart2.render();
  }
  profileNavigate() {

    this.router.navigate(["/main"]);
  }

}
