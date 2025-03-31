import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { ICrop } from '../../interfaces/icrop';
Chart.register(...registerables);


@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line.chart.component.html',
  styleUrl: './line.chart.component.css'
})

export class LineChartComponent  implements AfterViewInit{
  @Input() chartData!: ChartData;
  @Input() currentCrop!: ICrop;
  @ViewChild('chartCanvas', {static: true}) private chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  public chartObj!: Chart;

  ngAfterViewInit(): void {
    this.chartObj = this.CreateLineChartObj(this.chartCanvasRef, this.chartData);
    this.chartObj.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update chart on chart data changes after first change
    if (changes['chartData'] && !changes['chartData'].firstChange ) {
      this.chartObj.data = this.chartData;
      this.chartObj.options.plugins!.title!.text = this.currentCrop.name + " yields in tonnes per hectare"
      this.chartObj.update();
    }
  }


  private CreateLineChartObj(chartCanvasRef: ElementRef<HTMLCanvasElement>, data: ChartData): Chart{
    const chartCanvasHtml = chartCanvasRef.nativeElement;

    if (!chartCanvasHtml){
      throw new Error("failed to get canvas context")
    }

    let chartObj = new Chart(
      chartCanvasHtml,
      {
        type: 'line',
        data: data,
        options:
        {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: this.currentCrop.name + " yields in tonnes per hectare"
            }
          }
        },
      }
    )
    return chartObj;
  }
}