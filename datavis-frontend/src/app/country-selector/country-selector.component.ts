import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { ICountry } from '../interfaces/icountry';
import { DataRequestService } from '../services/data-request.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-country-selector',
  imports: [NgFor],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})

export class CountrySelectorComponent implements OnInit { 
  protected selectableCountries: ICountry[] = [];
  private selectedCountries: ICountry[] = [];

  @Output() countriesSelectedEvent = new EventEmitter<ICountry[]>();

  constructor(private dataRequestService: DataRequestService) { }

  ngOnInit(): void {
    // Initialize selectableCountries with data from API
    let countriesObservable: Observable<ICountry[]> = this.dataRequestService.GetCountries();
    countriesObservable.subscribe((data: ICountry[]) => {
      this.selectableCountries = data;
    });
  }

  protected submitCountries(event: Event): void {
    // Prevent form submission and url change
    event.preventDefault();

    var form = event.target as HTMLFormElement;
    var formData = new FormData(form);
    var selectedCountryIds = formData.getAll('countries');
    console.log(selectedCountryIds);
    this.countriesSelectedEvent.emit(this.selectedCountries);
    // return selectedCountryIds; 
  }
}
