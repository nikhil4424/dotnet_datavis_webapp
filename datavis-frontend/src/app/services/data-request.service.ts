import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../interfaces/icountry';
import { Observable } from 'rxjs';
import { ICropYield } from '../interfaces/icrop-yield';

@Injectable({
  providedIn: 'root'
})

export class DataRequestService {

  readonly ROOT_URL = "http://localhost:5065/crop-api"
  
  constructor(private http: HttpClient) { }

  public GetCountries(): Observable<ICountry[]>
  {
    return this.http.get<ICountry[]>(this.ROOT_URL + "/countries");
  }

  public GetCropYieldsByCountriesAndCrop(countryIds: number[], cropId: number): Observable<ICropYield>{
    return this.http.get<ICropYield>(this.GenerateCropYieldRequestByCountriesAndCrop(countryIds, cropId));
  }


  private GenerateCropYieldRequestByCountriesAndCrop(countryIds: number[], cropId: number): string
  {
    var requestUrl: string = this.ROOT_URL + "/cropyields/countries/crop?"
    
    for (let countryId of countryIds){
      requestUrl += "countryIds=" + countryId + "&";
    }

    requestUrl += "cropId=" + cropId;
    console.log(requestUrl);

    return requestUrl;
  }
}
