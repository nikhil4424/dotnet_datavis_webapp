import { Component, Output, EventEmitter } from '@angular/core';

import { ICountry } from '../interfaces/icountry';

import { DataRequestService } from '../services/data-request.service';

@Component({
  selector: 'app-country-selector',
  imports: [],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})

export class CountrySelectorComponent { 
  selectableCountries!: ICountry[];
  @Output() countriesSelectedEvent = new EventEmitter<ICountry[]>();

  constructor(
    private dataRequestService: DataRequestService
  ) {}

  ngOnInit(): void {
    // Initialize selectable countries
    this.dataRequestService.GetCountries().subscribe(
      (countries: ICountry[]) => this.selectableCountries = countries
    )
  }

  protected submitCountries(event: Event): void {
    // Prevent form submission and url change
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    // convert formdata to number array
    let selectedCountryIds: number[] = formData.getAll('countries').map((id) => parseInt(id as string));

    let selectedCountryObjs: ICountry[] = this.selectableCountries.filter((country) => selectedCountryIds.includes(country.id));
    this.countriesSelectedEvent.emit(selectedCountryObjs);
  }
}
