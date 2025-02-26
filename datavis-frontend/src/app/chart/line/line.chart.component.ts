import { AfterViewInit, Component } from '@angular/core';
import { CountrySelectorComponent } from "../../country-selector/country-selector.component";
import { CropSelectorComponent } from "../../crop-selector/crop-selector.component";

import { DataRequestService } from '../../services/data-request.service';
import { ChartDataHandlerService } from '../../services/chart-data-handler.service';

import { ICropYield } from '../../interfaces/icrop-yield';

import { Observable } from 'rxjs';

import { Chart, ChartConfiguration, DatasetController, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  imports: [CountrySelectorComponent, CropSelectorComponent],
  templateUrl: './line.chart.component.html',
  styleUrl: './line.chart.component.css'
})

export class LineChartComponent implements AfterViewInit {
  constructor
  (
    private dataRequestService: DataRequestService,
    private chartDataHandlerService: ChartDataHandlerService
  ) {}

  
  private chartHtml: HTMLCanvasElement | undefined;
  private chartConfig: ChartConfiguration = 
  {
    type: 'line',
    data:
    {
      labels: ['2000', '2001', '2002', '2003'],
      datasets: 
      [
        {
          label: 'Afghanistan',
          data: [1.5, 1., 2., 3]
        }
      ]
    }
  }
  private chart: Chart | undefined;

  public ngAfterViewInit(): void {
    this.SetupChart();
  }

  protected SetupChart(): void {
    this.chartHtml = document.getElementById('chart') as HTMLCanvasElement;

    this.chartConfig = this.chartDataHandlerService.GetLineChartConfigFromCropYield(
      this.chartDataHandlerService.EXAMPLE_DATA
    );

    this.chart = new Chart(
      this.chartHtml,
      this.chartConfig
    );
  };

  protected OnCountriesSelected(countryIds: number[]): void {
    // request crop yield data from api
    var cropYieldsObservable: Observable<ICropYield[]> = this.dataRequestService.GetCropYieldsByCountriesAndCrop(countryIds, 1);
    
    // update chartConfig with new data
    cropYieldsObservable.subscribe((cropYields: ICropYield[]) => {
      this.chartConfig = this.chartDataHandlerService.GetLineChartConfigFromCropYield(cropYields);
      
    });

    this.chart!.config.data = this.chartConfig.data;
    this.chart!.update();
  }


}