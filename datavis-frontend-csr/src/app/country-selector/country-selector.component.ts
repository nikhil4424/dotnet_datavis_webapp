import { Component, Output, EventEmitter, Input, } from '@angular/core';
import { ICountry } from '../interfaces/icountry';

@Component({
  selector: 'app-country-selector',
  imports: [],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})

export class CountrySelectorComponent { 
  @Input({required: true}) selectableCountries: ICountry[] = [];

  @Output() countriesSelectedEvent = new EventEmitter<ICountry[]>();


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
