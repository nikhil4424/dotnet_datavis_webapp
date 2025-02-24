import { AfterViewInit, Component } from '@angular/core';
import { CountrySelectorComponent } from "../country-selector/country-selector.component";
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ICountry } from '../interfaces/icountry';
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

  private yield_data: any 

  protected OnCountriesSelected(countries: ICountry[]): void {
    // TODO call ChartDataHandler with countries and crop type to get chart data
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