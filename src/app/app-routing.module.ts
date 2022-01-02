import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './pages/address-book/address-book.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { TrackingInfoComponent } from './tracking-info/tracking-info.component';
import { GlobalWarehouseComponent } from './warehouse/global-warehouse/global-warehouse.component';
import { LocalWarehouseComponent } from './warehouse/local-warehouse/local-warehouse.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'address-book', component: AddressBookComponent},
  {path: 'warehouse', component: WarehousePageComponent, children:[
    {path: 'local-warehouse', component: LocalWarehouseComponent},
    {path: 'global-warehouse', component: GlobalWarehouseComponent}
  ]},
  {path: 'tracking-info/:parcelId',component: TrackingInfoComponent},
{path: 'registration', component: RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
