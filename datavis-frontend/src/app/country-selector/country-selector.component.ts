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

  @Output() countriesSelectedEvent = new EventEmitter<number[]>();

  constructor(private dataRequestService: DataRequestService) { }

  ngOnInit(): void {
    // Initialize selectableCountries with data from API, to be used in html country-selector.component.html
    try{
      let countriesObservable: Observable<ICountry[]> = this.dataRequestService.GetCountries();
      countriesObservable.subscribe((data: ICountry[]) => {
      this.selectableCountries = data;
    });
    } catch (error) {
      console.error("Error in country-selector.component.ngOnInit: " + error);
    }
  }

  protected submitCountries(event: Event): void {
    // Prevent form submission and url change
    event.preventDefault();

    var form = event.target as HTMLFormElement;
    var formData = new FormData(form);
    // convert formdata to number array
    var selectedCountryIds: number[] = formData.getAll('countries').map((id) => parseInt(id as string));
    this.countriesSelectedEvent.emit(selectedCountryIds);
  }
}
