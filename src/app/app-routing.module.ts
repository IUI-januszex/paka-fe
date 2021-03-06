import { LogisticianGuard } from './Auth/logistician.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { CourierParcelsComponent } from './pages/courier-parcels/courier-parcels.component';
import { LogiAssignedParcelsComponent } from './pages/logi-assigned-parcels/logi-assigned-parcels.component';
import { AssignedParcelsComponent } from './pages/assigned-parcels/assigned-parcels.component';
import { SendParcelComponent } from './pages/send-parcel/send-parcel.component';
import { UsersComponent } from './pages/users/users.component';
import { MyParcelsComponent } from './pages/my-parcels/my-parcels.component';
import { ParcelTypeComponent } from './pages/parcel-type/parcel-type.component';
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
import { CourierGuard } from './Auth/courier.guard';
import { ClientGuard } from './Auth/client.guard';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'parcel-type', component: ParcelTypeComponent, canActivate: [AdminGuard]},
  {path: 'address-book', component: AddressBookComponent, canActivate: [ClientGuard]},
  {path: 'my-parcels', component:MyParcelsComponent, canActivate: [ClientGuard]},
  {path: 'assigned-parcels', component: AssignedParcelsComponent, canActivate: [CourierGuard]},
  {path: 'logistician-assigned-parcels',component: LogiAssignedParcelsComponent, canActivate: [LogisticianGuard]},
  {path: 'send-parcel', component:SendParcelComponent, canActivate: [ClientGuard]},
  {path: 'logout', component: LogoutComponent},
  {path: 'warehouse', component: WarehousePageComponent, children:[
    {path: 'local-warehouse', component: LocalWarehouseComponent},
    {path: 'global-warehouse', component: GlobalWarehouseComponent}
  ], canActivate: [AdminGuard]},
  {path: 'tracking-info/:parcelId',component: TrackingInfoComponent},
  {path: 'courier-parcels/:courierId', component: CourierParcelsComponent, canActivate:[LogisticianGuard]},
  {path: 'registration', component: RegisterPageComponent, children:[
  {path:'client-registration', component: ClientRegistrationComponent},
  {path:'business-client-registration', component: BusinessClientRegistrationComponent},
  {path:'courier-registration', component: CourierRegistrationComponent, canActivate:[AdminGuard]},
  {path:'logistician-registration', component:LogisticianRegistrationComponent, canActivate:[AdminGuard]},
  {path:'users',component:UsersComponent, canActivate: [AdminGuard]}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
