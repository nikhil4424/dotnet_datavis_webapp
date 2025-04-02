import { Component } from '@angular/core';
import { CropSelectorComponent } from '../../crop-selector/crop-selector.component';
import { PieChartComponent } from '../../chart/pie-chart/pie-chart.component';

import { ICrop } from '../../interfaces/icrop';
import { ICropYield } from '../../interfaces/icrop-yield';

import { DataRequestService } from '../../services/data-request.service';

import { ChartData } from 'chart.js';

import { Observable } from 'rxjs';
import { YearSelectorComponent } from "../../year-selector/year-selector.component";
import { ChartDataHandlerService } from '../../services/chart-data-handler.service';
import { ICountryYield } from '../../interfaces/icountry-yield';

@Component({
  selector: 'app-page-pie-chart',
  imports: [CropSelectorComponent, PieChartComponent, YearSelectorComponent],
  templateUrl: './page-pie-chart.component.html',
  styleUrl: './page-pie-chart.component.css'
})
export class PagePieChartComponent {
  protected selectedCrop: ICrop = {id: 1, name: "almond"};
  protected selectedMinYear: number = 2000;
  protected selectedMaxYear: number = 2005;

  protected pieChartData!: ChartData // input for pie.chart.component, initialized in ngOnInit()

  constructor (
    private _dataRequestService: DataRequestService,
    private _chartDataHandlerService: ChartDataHandlerService
  ) { }

  ngOnInit(): void {
    this.SetPieChartCountryYieldData(this.selectedMinYear, this.selectedMaxYear, this.selectedCrop.id);
  }


  protected OnCropSelected(crop: ICrop): void {
    this.selectedCrop = crop;
    console.log(this.selectedCrop);
    this.SetPieChartCountryYieldData(this.selectedMinYear, this.selectedMaxYear, this.selectedCrop.id);
  }

  protected OnYearsSelected(yearsForm: FormData): void {
    this.selectedMinYear = yearsForm.get('minYear') as unknown as number;
    this.selectedMaxYear = yearsForm.get('maxYear') as unknown as number;

    console.log(this.selectedMinYear, this.selectedMaxYear);
    // update PieChartData with new min and max year
    this.SetPieChartCountryYieldData(this.selectedMinYear, this.selectedMaxYear, this.selectedCrop.id)
  }

  protected SetPieChartCountryYieldData(minYear: number, maxYear: number, cropId: number): void {
    // request crop yield data from api
    // var conutryYieldObservable: Observable<ICountryYield[]> = this._dataRequestService.Get


    this.pieChartData =  this._chartDataHandlerService.GetPieChartDataFromApiCropYearRange( this._chartDataHandlerService.EXAMPLE_PIECHART_DATA );
    console.log(this.pieChartData);
  }
    
}
