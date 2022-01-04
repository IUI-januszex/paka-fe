import { AdminGuard } from './Auth/AdminGuard';
import { LogisticianRegistrationComponent } from './registration/logistician-registration/logistician-registration.component';
import { CourierRegistrationComponent } from './registration/courier-registration/courier-registration.component';
import { BusinessClientRegistrationComponent } from './registration/business-client-registration/business-client-registration.component';
import { ClientRegistrationComponent } from './registration/client-registration/client-registration.component';
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
  ], canActivate: [AdminGuard]},
  {path: 'tracking-info/:parcelId',component: TrackingInfoComponent},
{path: 'registration', component: RegisterPageComponent, children:[
  {path:'client-registration', component: ClientRegistrationComponent},
  {path:'business-client-registration', component: BusinessClientRegistrationComponent},
  {path:'courier-registration', component: CourierRegistrationComponent},
  {path:'logistician-registration', component:LogisticianRegistrationComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
