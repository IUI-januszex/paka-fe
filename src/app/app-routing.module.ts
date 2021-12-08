import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { TrackingInfoComponent } from './tracking-info/tracking-info.component';
import { GlobalWarehouseComponent } from './warehouse/global-warehouse/global-warehouse.component';
import { LocalWarehouseComponent } from './warehouse/local-warehouse/local-warehouse.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'warehouse', component: WarehousePageComponent, children:[
    {path: 'local-warehouse', component: LocalWarehouseComponent},
    {path: 'global-warehouse', component: GlobalWarehouseComponent}
  ]},
  {path: 'tracker-info',component: TrackingInfoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
