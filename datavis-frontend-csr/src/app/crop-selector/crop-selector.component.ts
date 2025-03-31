import { Component, Output, EventEmitter } from '@angular/core';

import { ICrop } from '../interfaces/icrop';

import { DataRequestService } from '../services/data-request.service';

@Component({
  selector: 'app-crop-selector',
  imports: [],
  templateUrl: './crop-selector.component.html',
  styleUrl: './crop-selector.component.css'
})
export class CropSelectorComponent {
  selectableCrops!: ICrop[];
  @Output() cropSelectedEvent = new EventEmitter<ICrop>();

  constructor(
    private dataRequestService: DataRequestService
  ) {}

  ngOnInit(): void {
    // Initialize selectable crops
    this.dataRequestService.GetCrops().subscribe(
      (crops: ICrop[]) => this.selectableCrops = crops
    )
  }

  protected submitCrop(event: Event): void {
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    let selectedCropId = formData.get('crops') as unknown as number;
    let selectedCropObj = this.selectableCrops.filter((crop) => crop.id == selectedCropId);

    this.cropSelectedEvent.emit(selectedCropObj[0]);
  }
}
