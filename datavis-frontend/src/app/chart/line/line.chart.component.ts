import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartData } from 'chart.js';


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

  private defaultChartData: ChartData = 
  {
    labels: ['2000', '2001', '2002', '2003'],
    datasets: 
    [
      {
        label: 'Afghanistan',
        data: [1.5, 1., 2., 3]
      }
    ]
  }

  ngAfterViewInit(): void{
    this.chartObj = this.CreateLineChart(this.chartCanvasRef);
  }

  private CreateLineChart(chartCanvasRef: ElementRef<HTMLCanvasElement>): Chart{
    const chartCanvas = chartCanvasRef.nativeElement.getContext('2d');
    if (!chartCanvas){
      throw new Error("failed to get canvas context")
    }

    let chartObj = new Chart(
      "chart-canvas",
      {
        type: 'line',
        data: this.chartData
      }
    )
    return chartObj;
  }
}