
import { Component } from '@angular/core';
import { CountrySelectorComponent } from '../../country-selector/country-selector.component';
import { CropSelectorComponent } from '../../crop-selector/crop-selector.component';
import { LineChartComponent } from '../../chart/line-chart/line.chart.component';

import { ICountry } from '../../interfaces/icountry';
import { ICrop } from '../../interfaces/icrop';
import { ICropYield } from '../../interfaces/icrop-yield';

import { DataRequestService } from '../../services/data-request.service';
import { ChartDataHandlerService } from '../../services/chart-data-handler.service';

import { ChartData } from 'chart.js';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-page-line-chart',
  imports: [CountrySelectorComponent, CropSelectorComponent, LineChartComponent],
  templateUrl: './page-line-chart.component.html',
  styleUrl: './page-line-chart.component.css'
})
export class PageLineChartComponent {

   // Input variables for child selector components
    protected selectableCountries!: ICountry[]; // for CountrySelector, initialized in ngOnInit()
    protected selectableCrops!: ICrop[]; // input for CropSelector, initialized in ngOnInit()
    
    protected selectedCountries: ICountry[] = [{id: 1, name: "Afghanistan"}];
    protected selectedCrop: ICrop = {id: 1, name: "almond"};
    
      // For child chart component
    protected  lineChartData!: ChartData;// input for line.chart.component for canvas, initialized in ngOnInit()
  
    constructor(
      private dataRequestService: DataRequestService,
      private chartDataHandlerService: ChartDataHandlerService
    ) {}
  
    ngOnInit(): void {
      // Initialize selectable countries
      this.dataRequestService.GetCountries().subscribe(
        (countries: ICountry[]) => this.selectableCountries = countries
      )
      // Initialize selectable crops
      this.dataRequestService.GetCrops().subscribe(
        (crops: ICrop[]) => this.selectableCrops = crops
      )
      this.SetLineChartCropYieldData(this.selectedCountries.map((c) => c.id), this.selectedCrop.id);
    }
  
    // method has to set the cropyielddata itself it seems, because of of the asynchronous nature of subscribing to an Observable
    protected SetLineChartCropYieldData(countryIds: number[], cropId: number): void {
      // request crop yield data from api
      var cropYieldsObservable: Observable<ICropYield[]> = this.dataRequestService.GetCropYieldsByCountriesAndCrop(countryIds, cropId);
      
      // update chart data with new data
      cropYieldsObservable.subscribe(
        (cropYields: ICropYield[]) => {
        this.lineChartData = this.chartDataHandlerService.GetLineChartDataFromCropYield(cropYields);
      });
    }
  
    protected OnCountriesSelected(countries: ICountry[]): void {
      this.selectedCountries = countries;
      this.SetLineChartCropYieldData(this.selectedCountries.map((c) => c.id), this.selectedCrop.id);
    }
  
    protected OnCropSelected(crop: ICrop): void {
      this.selectedCrop = crop;
      this.SetLineChartCropYieldData(this.selectedCountries.map((c) => c.id), this.selectedCrop.id);
    }
}
