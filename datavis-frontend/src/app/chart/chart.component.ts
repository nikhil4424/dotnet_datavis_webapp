import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements AfterViewInit {
  ngAfterViewInit(): void {

    if (typeof(document) !== 'undefined')
    {
      const chartHtml = document.getElementById('chart') as HTMLCanvasElement;

      new Chart(chartHtml,
        {
          type: 'bar',
          data: 
          {
            labels: ['Almonds', 'Peanuts', 'Apples'],
            datasets: 
            [
              {
                label: 'Quantity',
                data: [100, 50, 20],
              }
            ]
          },
          options:
          {
            scales: 
            {
              y: 
              {
                beginAtZero: true
              }
            }
          }
        }
      );

    }

    
  }
}