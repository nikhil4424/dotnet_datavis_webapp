import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line.chart.component.html',
  styleUrl: './line.chart.component.css'
})

export class LineChartComponent  implements AfterViewInit{
  @Input() chartData!: ChartData;
  @ViewChild('chartCanvas') chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  protected chartObj!: Chart;



  ngAfterViewInit(): void{
    this.chartObj = this.CreateLineChartObj(this.chartCanvasRef, this.chartData);
    this.chartObj.update();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && !changes['chartData'].firstChange ) {
      this.chartObj.data = this.chartData;
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
              text: "Crop yields in tonnes per hectare"
            }
          }
        },
      }
    )
    return chartObj;
  }
}