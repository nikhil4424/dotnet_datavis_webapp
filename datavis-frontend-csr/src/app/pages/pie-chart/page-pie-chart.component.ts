import { Component } from '@angular/core';
import { CropSelectorComponent } from '../../crop-selector/crop-selector.component';
import { PieChartComponent } from '../../chart/pie-chart/pie-chart.component';

import { ICrop } from '../../interfaces/icrop';
import { ICropYield } from '../../interfaces/icrop-yield';

import { DataRequestService } from '../../services/data-request.service';

import { ChartData } from 'chart.js';

import { Observable } from 'rxjs';
import { YearSelectorComponent } from "../../year-selector/year-selector.component";

@Component({
  selector: 'app-page-pie-chart',
  imports: [CropSelectorComponent, PieChartComponent, YearSelectorComponent],
  templateUrl: './page-pie-chart.component.html',
  styleUrl: './page-pie-chart.component.css'
})
export class PagePieChartComponent {
  protected selectedCrop: ICrop = {id: 1, name: "almond"};
  protected selectedMinYear: FormDataEntryValue = '2000';
  protected selectedMaxYear: FormDataEntryValue = '2005';

  protected pieChartData!: ChartData

  protected OnCropSelected(crop: ICrop): void {
    this.selectedCrop = crop;
    console.log(this.selectedCrop);
  }

  protected OnYearsSelected(yearsForm: FormData): void {
    this.selectedMinYear = yearsForm.get('minYear')!;
    this.selectedMaxYear = yearsForm.get('maxYear')!;

    console.log(this.selectedMinYear, this.selectedMaxYear);
    
  }
    
}
