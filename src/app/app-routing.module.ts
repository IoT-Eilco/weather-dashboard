import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HistoryTableComponent} from "./history-table/history-table.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path: 'history', component: HistoryTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
