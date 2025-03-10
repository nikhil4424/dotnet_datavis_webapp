import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICrop } from '../interfaces/icrop';

@Component({
  selector: 'app-crop-selector',
  imports: [],
  templateUrl: './crop-selector.component.html',
  styleUrl: './crop-selector.component.css'
})
export class CropSelectorComponent {
  @Input({required: true}) selectableCrops!: ICrop[];
  
  
  @Output() cropSelectedEvent = new EventEmitter<ICrop>();

  protected submitCrop(event: Event): void {
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    let selectedCropId = formData.get('crops') as unknown as number;
    let selectedCropObj = this.selectableCrops.filter((crop) => crop.id == selectedCropId);

    this.cropSelectedEvent.emit(selectedCropObj[0]);
  }

}
