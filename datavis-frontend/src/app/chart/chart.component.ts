import { AfterViewInit, Component } from '@angular/core';
import { CountrySelectorComponent } from "../country-selector/country-selector.component";
import { ICountry } from '../interfaces/icountry';
import { DataRequestService } from '../services/data-request.service';
import { ICropYield } from '../interfaces/icrop-yield';
import { CropSelectorComponent } from "../crop-selector/crop-selector.component";
import { Observable } from 'rxjs';

import { Chart, ChartConfiguration, DatasetController, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  imports: [CountrySelectorComponent, CropSelectorComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements AfterViewInit {

  constructor(private dataRequestService: DataRequestService) { }

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

  protected OnCountriesSelected(countryIds: number[]): void {
    var cropYieldsObservable: Observable<ICropYield[]> = this.dataRequestService.GetCropYieldsByCountriesAndCrop(countryIds, 1);
    var cropYields: ICropYield[] = [];
    
    cropYieldsObservable.subscribe((data: ICropYield[]) => {
      console.log("chart-component.OnCountriesSelected: ");
      console.log(data);

    });
    
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