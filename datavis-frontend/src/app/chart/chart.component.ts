import { AfterViewInit, Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { CountrySelectorComponent } from "../country-selector/country-selector.component";
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  imports: [CountrySelectorComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements AfterViewInit {
  // TODO later through API
  private x_labels = ['2000', '2001', '2002', '2003']
  private datasets = 
    [
      {
        label: 'Afghanistan',
        data: [1.5, 1., 2., 3]
      }
    ]
  
  private data = 
    {
      labels: this.x_labels,
      datasets: this.datasets
    }

  private config:ChartConfiguration = 
  {
    type: 'line',
    data: this.data
  }

  ngAfterViewInit(): void {
    if (typeof(document) !== 'undefined')
    {
      const chartHtml:HTMLCanvasElement = document.getElementById('chart') as HTMLCanvasElement;

      new Chart(
        chartHtml,
        this.config
      );
    }
  }
}