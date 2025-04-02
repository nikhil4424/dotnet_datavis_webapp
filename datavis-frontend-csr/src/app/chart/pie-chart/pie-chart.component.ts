import { AfterViewInit, Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { ICrop } from '../../interfaces/icrop';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements AfterViewInit {  
  @Input() chartData!: ChartData;
  @Input() currentCrop!: ICrop;
  @ViewChild('chartCanvas', {static:true}) private chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  public chartObj!: Chart;

  ngAfterViewInit(): void {
    this,this.chartObj = this.CreatePieChartObj(this.chartCanvasRef, this.chartData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && !changes['chartData'].firstChange ) {
      this.chartObj.data = this.chartData;
      this.chartObj.options.plugins!.title!.text = "Top countries by " + this.currentCrop.name + " yields"
      this.chartObj.update();
    }
  }

  private CreatePieChartObj(
    chartCanvasRef: ElementRef<HTMLCanvasElement>, 
    data: ChartData
  ): Chart{
    const chartCanvasHtml = chartCanvasRef.nativeElement;

    if (!chartCanvasHtml){
      throw new Error("failed to get canvas context")
    }

    let chartObj = new Chart(
      chartCanvasHtml,
      {
        type: 'pie',
        data: data,
        options:
        {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Top countries by " + this.currentCrop.name + " yields"
            }
          }
        }
      }
    )
    return chartObj;
  }
}
