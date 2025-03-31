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
  private defaultChartData: ChartData = 
  {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: 
    [
      {
      label: 'My First Dataset',
      data: [300, 50, 100],
      // backgroundColor: [
      //   'rgb(255, 99, 132)',
      //   'rgb(54, 162, 235)',
      //   'rgb(255, 205, 86)'
      // ],
      hoverOffset: 4
      },
    ]
  };
  
  
  @Input() chartData!: ChartData;
  @Input() currentCrop!: ICrop;
  @ViewChild('chartCanvas', {static:true}) private chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  public chartObj!: Chart;

  ngAfterViewInit(): void {
    this,this.chartObj = this.CreatePieChartObj(this.chartCanvasRef, this.defaultChartData)
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
              text: "Percentage of crop yields by country"
            }
          }
        }
      }
    )
    return chartObj;
  }

}
