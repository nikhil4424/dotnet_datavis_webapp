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
  // private countries:Array<string> = ['Afghanistan', 'Albania', 'Netherlands', 'Germany'];
  protected countries: ICountry[] = [];
  private selectedCountries: ICountry[] = [];

  @Output() countriesSelectedEvent = new EventEmitter<ICountry[]>();

  constructor(private dataRequestService: DataRequestService) { }

  ngOnInit(): void {

    let countriesObservable: Observable<ICountry[]> = this.dataRequestService.GetCountries();
    countriesObservable.subscribe((data: ICountry[]) => {
      this.countries = data;
    });
  }

  protected submitCountries(): void {
    this.countriesSelectedEvent.emit(this.selectedCountries);
  }
}
