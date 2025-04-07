import { Component, EventEmitter, Output } from '@angular/core';
import { DataRequestService } from '../services/data-request.service';

@Component({
  selector: 'app-year-selector',
  imports: [],
  templateUrl: './year-selector.component.html',
  styleUrl: './year-selector.component.css'
})
export class YearSelectorComponent {
  minSelectableYear!: number;
  maxSelectableYear!: number;
  

  @Output() yearsSelectedEvent = new EventEmitter<FormData>();

  constructor(
    private _dataRequestService: DataRequestService
  ) {}

  ngOnInit(): void {
    // Set minimum selectable year
    this._dataRequestService.GetMinYearValue().subscribe(
      (year:number) => this.minSelectableYear = year
    )

    // Set maximum selectable year
    this._dataRequestService.GetMaxYearValue().subscribe(
      (year:number) => this.maxSelectableYear = year
    )
  }

  public SubmitYears(event: Event): void {
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    this.yearsSelectedEvent.emit(formData);
  }
}
