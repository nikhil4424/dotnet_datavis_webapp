import { Component } from '@angular/core';
import { CropSelectorComponent } from '../../crop-selector/crop-selector.component';
import { YearSelectorComponent } from "../../year-selector/year-selector.component";
import { PieChartComponent } from '../../chart/pie-chart/pie-chart.component';

import { ICrop } from '../../interfaces/icrop';
import { ICountryYield } from '../../interfaces/icountry-yield';

import { DataRequestService } from '../../services/data-request.service';
import { ChartDataHandlerService } from '../../services/chart-data-handler.service';

import { ChartData } from 'chart.js';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-pie-chart',
  imports: [CropSelectorComponent, PieChartComponent, YearSelectorComponent],
  templateUrl: './page-pie-chart.component.html',
  styleUrl: './page-pie-chart.component.css'
})
export class PagePieChartComponent {
  // inputs for pie.chart.component, initialized in ngOnInit()
  protected selectedCrop: ICrop = {id: 1, name: "almond"};
  protected selectedYearStart: number = 2000;
  protected selectedYearEnd: number = 2005;
  protected pieChartData!: ChartData // input for pie.chart.component, initialized in ngOnInit()

  constructor (
    private _dataRequestService: DataRequestService,
    private _chartDataHandlerService: ChartDataHandlerService
  ) { }

  ngOnInit(): void {
    this.SetPieChartCountryYieldData(this.selectedYearStart, this.selectedYearEnd, this.selectedCrop.id);
  }

  protected OnCropSelected(crop: ICrop): void {
    this.selectedCrop = crop;
    console.log(this.selectedCrop);
    this.SetPieChartCountryYieldData(this.selectedYearStart, this.selectedYearEnd, this.selectedCrop.id);
  }

  protected OnYearsSelected(yearsForm: FormData): void {
    this.selectedYearStart = yearsForm.get('yearStart') as unknown as number;
    this.selectedYearEnd = yearsForm.get('yearEnd') as unknown as number;

    console.log(this.selectedYearStart, this.selectedYearEnd);
    // update PieChartData with new min and max year
    this.SetPieChartCountryYieldData(this.selectedYearStart, this.selectedYearEnd, this.selectedCrop.id)
  }

  protected SetPieChartCountryYieldData(yearStart: number, yearEnd: number, cropId: number): void {
    // request crop yield data from api
    var CountryYieldObservable: Observable<ICountryYield[]> = this._dataRequestService.GetCountryYields(yearStart, yearEnd, cropId);
      CountryYieldObservable.subscribe (
      (cy: ICountryYield[]) => {
        this.pieChartData = this._chartDataHandlerService.GetPieChartDataFromApiCropYearRange(cy);
      }
    )
  }
}
