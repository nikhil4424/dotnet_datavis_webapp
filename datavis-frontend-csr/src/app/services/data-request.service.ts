import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../interfaces/icountry';
import { Observable } from 'rxjs';
import { ICropYield } from '../interfaces/icrop-yield';
import { ICrop } from '../interfaces/icrop';

@Injectable({
  providedIn: 'root'
})

export class DataRequestService {

  readonly ROOT_URL = "http://localhost:5065/crop-api/"
  
  constructor(private http: HttpClient) { }

  public GetCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.ROOT_URL + "countries");
  }

  public GetCrops(): Observable<ICrop[]> {
    return this.http.get<ICrop[]>(this.ROOT_URL + "crops");
  }

  public GetCropYieldsByCountriesAndCrop(countryIds: number[], cropId: number): Observable<ICropYield[]> {
    var requestUrl: string = this.GenerateCropYieldRequestByCountriesAndCrop(countryIds, cropId);
    return this.http.get<ICropYield[]>(requestUrl);
  }

  private GenerateCropYieldRequestByCountriesAndCrop(countryIds: number[], cropId: number): string {
    var requestUrl: string = this.ROOT_URL + "cropyields/countries/crop?"
    
    for (let countryId of countryIds){
      requestUrl += "countryIds=" + countryId + "&";
    }

    requestUrl += "cropId=" + cropId;

    return requestUrl;
  }
}
