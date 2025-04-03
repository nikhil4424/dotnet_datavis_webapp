import { Injectable, output } from '@angular/core';
import { ICropYield } from '../interfaces/icrop-yield';
import { Chart, ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import { ICountry } from '../interfaces/icountry';
import { ICountryYield } from '../interfaces/icountry-yield';

@Injectable({
  providedIn: 'root'
})
export class ChartDataHandlerService {

  constructor() { }

  public EXAMPLE_LINECHART_DATA: ICropYield[] = 
  [
    {
      "id": 110,
      "country": "Africa (FAO)",
      "crop": "almond",
      "year": 1961,
      "value": 0.2279
    },
    {
      "id": 172,
      "country": "Algeria",
      "crop": "almond",
      "year": 1961,
      "value": 0.4511
    },
    {
      "id": 111,
      "country": "Africa (FAO)",
      "crop": "almond",
      "year": 1962,
      "value": 0.2875
    },
    {
      "id": 173,
      "country": "Algeria",
      "crop": "almond",
      "year": 1962,
      "value": 0.4511
    }
  ];

  public EXAMPLE_PIECHART_DATA: ICountryYield[] = [
    {
      "name": "Oceania",
      "total_yield": 38.1000573
    },
    {
      "name": "Oceania (FAO)",
      "total_yield": 38.0999998
    },
    {
      "name": "Australia",
      "total_yield": 38.0999998
    },
    {
      "name": "Croatia",
      "total_yield": 28.1135997
    },
    {
      "name": "United Arab Emirates",
      "total_yield": 25.0542998
    },
    {
      "name": "Jordan",
      "total_yield": 24.4799995
    },
    {
      "name": "Lebanon",
      "total_yield": 24.2380994
    },
    {
      "name": "Northern America (FAO)",
      "total_yield": 19.0386995
    },
    {
      "name": "United States",
      "total_yield": 19.0386995
    },
    {
      "name": "North America",
      "total_yield": 19.0370452
    },
    {
      "name": "Americas (FAO)",
      "total_yield": 18.7659998
    },
    {
      "name": "Pakistan",
      "total_yield": 15.9825997
    },
    {
      "name": "Israel",
      "total_yield": 15.9335996
    },
    {
      "name": "Uzbekistan",
      "total_yield": 15.5853
    },
    {
      "name": "Other",
      "total_yield": 458.600131982
    }
  ]

  public GetLineChartDataFromCropYield(cropYieldData: ICropYield[]): ChartData{
    let outputData: ChartData = 
    {
      labels: [], // ICropYield.year unique sorted
      datasets: 
      [
        // { ChartDataset
        //   label: "",  // ICropYield.country
        //   data: [] , // ICropYield.values
        // }
      ] 
    }

    let uniqueYears: number[] = this.GetSortedUniqueYearsFromCropYields(cropYieldData);
    outputData.labels = uniqueYears;

    let uniqueCountries: string[] = this.GetSortedUniqueCountriesFromCropYields(cropYieldData);

    for (let country of uniqueCountries){

      let countryCropYieldDataset: ChartDataset = this.GetCropYieldValuesByCountry(cropYieldData, country);
      outputData.datasets.push(
        countryCropYieldDataset
      );
    }

    return outputData;
  }

  public GetPieChartDataFromApiCropYearRange(countryYields: ICountryYield[]): ChartData {
    // Pie chart uses a single ChartDataset
    let outputData: ChartData = 
    {
      labels: [], // ICountryYield.name values
      datasets: 
      [
        // ChartDataset
        { 
          label: 'Yield in tonnes/hectare',
          data: [] , // ICountryYield.total_yield values
        }
      ] 
    }

    let chartCountryLabels: string[] = countryYields.map((cy) => cy.name);
    outputData.labels = chartCountryLabels;
    
    let chartCountryYields: number[] = countryYields.map((cy) => cy.total_yield);
    outputData.datasets[0].data = chartCountryYields;

    return outputData;
  }

  private GetSortedUniqueYearsFromCropYields(cropYieldData: ICropYield[]): number[]{
    let allYears: number[] = cropYieldData.map((cropYield) => cropYield.year);
    let uniqueYears: number[] = Array.from(new Set(allYears));

    return uniqueYears.sort();
  }

  private GetSortedUniqueCountriesFromCropYields(cropYieldData: ICropYield[]): string[]{
    let allCountries: string[] = cropYieldData.map((cropYield) => cropYield.country);
    let uniqueCountries: string[] = Array.from(new Set(allCountries));

    return uniqueCountries.sort();
  }

  private GetCropYieldValuesByCountry(cropYieldData: ICropYield[], country: string): ChartDataset{
    let output: ChartDataset =
    {
      label: country,
      data: []
    }

    let countryCropYields: ICropYield[] = cropYieldData.filter((cropYield) => cropYield.country === country);
    let countryCropYieldValues: number[] = countryCropYields.map((cropYield) => cropYield.value);
    output.data = countryCropYieldValues;

    return output;
  }
}