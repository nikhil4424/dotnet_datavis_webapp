import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../interfaces/icountry';
import { Observable } from 'rxjs';

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
  
}
