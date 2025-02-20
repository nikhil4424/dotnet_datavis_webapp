import { Component } from '@angular/core';

@Component({
  selector: 'app-country-selector',
  imports: [],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css'
})
export class CountrySelectorComponent {
  private countries:Array<string> = ['Afghanistan', 'Albania', 'Netherlands', 'Germany'];

  // function HandleData(countryNames: Array<string>)
  // {
  //   return 0;
  // }
  
}
