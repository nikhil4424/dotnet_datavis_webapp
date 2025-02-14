import { Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:"", component:AppComponent
    },
    {
        path:"chart", component:ChartComponent
    }
];
