import { Component, inject, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { ICountry } from './interfaces/icountry';
import { ICropYield } from './interfaces/icrop-yield';

import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { CropSelectorComponent } from './crop-selector/crop-selector.component';
import { LineChartComponent } from './chart/line/line.chart.component';

import { ChartDataHandlerService } from './services/chart-data-handler.service';
import { DataRequestService } from './services/data-request.service';

import { ChartData } from 'chart.js';


@Component({
  selector: 'app-root',
  imports: [CountrySelectorComponent, LineChartComponent, CropSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'datavis-frontend';

  // service depencdency injections
  private chartDataHandlerService:ChartDataHandlerService = inject(ChartDataHandlerService);
  private dataRequestService: DataRequestService = inject(DataRequestService)

  protected selectableCountries!: ICountry[]; // for CountrySelector, initialized in ngOnInit

  protected lineChartData!: ChartData;// for canvas basechart html


  ngOnInit(): void {
    this.selectableCountries = this.GetSelectableCountries();
  }

  protected GetSelectableCountries(): ICountry[]{
    let selectableCounries: ICountry[] = [];
    try{
      let countriesObservable: Observable<ICountry[]> = this.dataRequestService.GetCountries();
      countriesObservable.subscribe((data: ICountry[]) => {
      selectableCounries = data;
    });
    } catch (error) {
      console.error("Error in country-selector.component.ngOnInit: " + error);
    }
    return selectableCounries;
  }

  protected OnCountriesSelected(countryIds: number[]): void {
    // request crop yield data from api
    var cropYieldsObservable: Observable<ICropYield[]> = this.dataRequestService.GetCropYieldsByCountriesAndCrop(countryIds, 1);
    
    // update chartConfig with new data
    cropYieldsObservable.subscribe((cropYields: ICropYield[]) => {
      this.lineChartData = this.chartDataHandlerService.GetLineChartDataFromCropYield(cropYields);
      console.log(cropYields);
      
    });
  }
}
