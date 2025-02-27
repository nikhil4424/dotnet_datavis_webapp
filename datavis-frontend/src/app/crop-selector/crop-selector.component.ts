import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICrop } from '../interfaces/icrop';

@Component({
  selector: 'app-crop-selector',
  imports: [],
  templateUrl: './crop-selector.component.html',
  styleUrl: './crop-selector.component.css'
})
export class CropSelectorComponent {
  @Input() selectableCrops!: ICrop[];
  
  @Output() cropSelectedEvent = new EventEmitter<number>();

  protected submitCrop(event: Event): void {
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);

    // convert formdata to number
    // let selectedCropId: number = formData.get
  }

}
