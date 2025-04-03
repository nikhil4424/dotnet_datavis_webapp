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
  @Input() currentYearStart!: number;
  @Input() currentYearEnd!: number;
  // canvas reference for chart
  @ViewChild('chartCanvas', {static:true}) private chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  public chartObj!: Chart;

  ngAfterViewInit(): void {
    this,this.chartObj = this.CreatePieChartObj(this.chartCanvasRef, this.chartData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update chart when chart data changes after first initialization
    if (changes['chartData'] && !changes['chartData'].firstChange ) {
      this.chartObj.data = this.chartData;
      this.chartObj.options.plugins!.title!.text = "Top countries/regions by sum of " + this.currentCrop.name + " yields between " + this.currentYearStart + " and " + this.currentYearEnd;
      this.chartObj.update();
    }
  }

  private CreatePieChartObj(
    chartCanvasRef: ElementRef<HTMLCanvasElement>, 
    data: ChartData
  ): Chart {
    const chartCanvasHtml = chartCanvasRef.nativeElement;

    if (!chartCanvasHtml){
      throw new Error("failed to get canvas context")
    }

    let chartObj = new Chart(
      chartCanvasHtml,
      {
        type: 'doughnut',
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
