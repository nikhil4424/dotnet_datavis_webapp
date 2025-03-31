import { Component } from '@angular/core';
import { CropSelectorComponent } from '../../crop-selector/crop-selector.component';
import { PieChartComponent } from '../../chart/pie-chart/pie-chart.component';

import { ICrop } from '../../interfaces/icrop';
import { ICropYield } from '../../interfaces/icrop-yield';

import { DataRequestService } from '../../services/data-request.service';
import { ChartDataHandlerService } from '../../services/chart-data-handler.service';

import { ChartData } from 'chart.js';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-pie-chart',
  imports: [CropSelectorComponent, PieChartComponent],
  templateUrl: './page-pie-chart.component.html',
  styleUrl: './page-pie-chart.component.css'
})
export class PagePieChartComponent {
  protected selectableCrops!: ICrop[]; // input for CropSelector, initialized in ngOnInit()
  protected selectedCrop: ICrop = {id: 1, name: "almond"};

  protected pieChartData!: ChartData

  protected OnCropSelected(crop: ICrop): void {
    this.selectedCrop = crop;
    console.log(this.selectedCrop);
  }
    
}
