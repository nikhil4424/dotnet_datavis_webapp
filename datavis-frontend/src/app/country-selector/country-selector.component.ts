import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ICountry } from '../interfaces/icountry';
import { DataRequestService } from '../services/data-request.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-country-selector',
  imports: [],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})

export class CountrySelectorComponent implements OnInit { 
  // private countries:Array<string> = ['Afghanistan', 'Albania', 'Netherlands', 'Germany'];
  private countries: ICountry[] = [];
  private selectedCountries: ICountry[] = [];

  @Output() selectedCountriesEvent = new EventEmitter<ICountry[]>();

  constructor(private dataRequestService: DataRequestService) { }

  ngOnInit(): void {

    let countriesObservable: Observable<ICountry[]> = this.dataRequestService.GetCountries();
    countriesObservable.subscribe((data: ICountry[]) => {
      this.countries = data;
      console.log(data);
    });

  }
}
