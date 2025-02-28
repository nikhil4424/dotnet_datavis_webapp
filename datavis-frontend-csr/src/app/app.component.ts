import { Component, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ICountry } from './interfaces/icountry';
import { ICrop } from './interfaces/icrop';
import { ICropYield } from './interfaces/icrop-yield';

import { DataRequestService } from './services/data-request.service';
import { ChartDataHandlerService } from './services/chart-data-handler.service';

import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { CropSelectorComponent } from './crop-selector/crop-selector.component';
import { LineChartComponent } from './chart/line/line.chart.component';

import { ChartData } from 'chart.js';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CountrySelectorComponent, CropSelectorComponent, LineChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'datavis-frontend-csr';

    // service depencdency injections
    // private chartDataHandlerService:ChartDataHandlerService = Inject(ChartDataHandlerService);
    // private dataRequestService: DataRequestService = Inject(DataRequestService)
  
    // Input variables for child selector components
    protected selectableCountries!: ICountry[]; // for CountrySelector, initialized in ngOnInit()
    protected selectableCrops!: ICrop[]; // input for CropSelector, initialized in ngOnInit()
    
    protected selectedCountryIds: number[] = [1];
    protected selectedCropId: number = 1;
    
      // For child chart components
    protected  lineChartData!: ChartData;// input for line.chart.component for canvas
  
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
  
      this.SetLineChartCropYieldData(this.selectedCountryIds, this.selectedCropId);
  
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
  
    protected OnCountriesSelected(countryIds: number[]): void {
      this.selectedCountryIds = countryIds;
      console.log("countries selected: " + countryIds)
      this.SetLineChartCropYieldData(this.selectedCountryIds, this.selectedCropId);

    }
  
    protected OnCropSelected(cropId: number|null): void {
      if (cropId == null) {
        return;
      }
      
      this.selectedCropId = cropId;
      console.log("crop selected: " + cropId);
      this.SetLineChartCropYieldData(this.selectedCountryIds, this.selectedCropId);
    }
  
  

}
