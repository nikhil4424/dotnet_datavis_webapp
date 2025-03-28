import { Routes } from '@angular/router';
import { PageLineChartComponent } from './page-line-chart/page-line-chart.component';
import { PagePieChartComponent } from './page-pie-chart/page-pie-chart.component';

export const routes: Routes = [
    {path: '', component: PageLineChartComponent},
    {path: "chart-pie", component: PagePieChartComponent}
];
