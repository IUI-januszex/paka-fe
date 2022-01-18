import { ToastsContainer } from './toast-container.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './modals/login-page/login-page.component';
import { FooterComponent } from './footer/footer.component';
import { SizeInfoComponent } from './size-info/size-info.component';
import { TrackerComponent } from './tracker/tracker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { NewWarehouseComponent } from './modals/new-warehouse/new-warehouse.component';
import { NewGlobalWarehouseComponent } from './modals/new-global-warehouse/new-global-warehouse.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TrackingInfoComponent } from './tracking-info/tracking-info.component';
import { LocalWarehouseComponent } from './warehouse/local-warehouse/local-warehouse.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { GlobalWarehouseComponent } from './warehouse/global-warehouse/global-warehouse.component';
import { EditWarehouseComponent } from './modals/edit-warehouse/edit-warehouse.component';
import { EditGlobalWarehouseComponent } from './modals/edit-global-warehouse/edit-global-warehouse.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { JwtInterceptorServiceService } from './Auth/jwt-interceptor-service.service';
import { PostalCodeComponent } from './modals/postal-code/postal-code.component';
import { SendParcelComponent } from './pages/send-parcel/send-parcel.component';
import { AddressBookComponent } from './pages/address-book/address-book.component';
import { NewAddressBookComponent } from './modals/new-address-book/new-address-book.component';
import { ClientRegistrationComponent } from './registration/client-registration/client-registration.component';
import { BusinessClientRegistrationComponent } from './registration/business-client-registration/business-client-registration.component';
import { LogisticianRegistrationComponent } from './registration/logistician-registration/logistician-registration.component';
import { CourierRegistrationComponent } from './registration/courier-registration/courier-registration.component';
import { ParcelTypeComponent } from './pages/parcel-type/parcel-type.component';
import { NewParcelTypeComponent } from './modals/new-parcel-type/new-parcel-type.component';
import { EditParcelTypeComponent } from './modals/edit-parcel-type/edit-parcel-type.component';
import { GetAddressBookComponent } from './modals/get-address-book/get-address-book.component';
import { MyParcelsComponent } from './pages/my-parcels/my-parcels.component';
import { UsersComponent } from './pages/users/users.component';
import { AssignedParcelsComponent } from './pages/assigned-parcels/assigned-parcels.component';
import { OperationButtonComponent } from './pages/operation-button/operation-button.component';
import { LogiAssignedParcelsComponent } from './pages/logi-assigned-parcels/logi-assigned-parcels.component';
import { CourierListComponent } from './pages/courier-list/courier-list.component';
import { CourierParcelsComponent } from './pages/courier-parcels/courier-parcels.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    FooterComponent,
    SizeInfoComponent,
    TrackerComponent,
    RegisterPageComponent,
    WarehousePageComponent,
    NewWarehouseComponent,
    NewGlobalWarehouseComponent,
    TrackingInfoComponent,
    LocalWarehouseComponent,
    GlobalWarehouseComponent,
    EditWarehouseComponent,
    EditGlobalWarehouseComponent,
    PostalCodeComponent,
    SendParcelComponent,
    AddressBookComponent,
    NewAddressBookComponent,
    ClientRegistrationComponent,
    BusinessClientRegistrationComponent,
    LogisticianRegistrationComponent,
    CourierRegistrationComponent,
    ParcelTypeComponent,
    NewParcelTypeComponent,
    EditParcelTypeComponent,
    GetAddressBookComponent,
    MyParcelsComponent,
    UsersComponent,
    AssignedParcelsComponent,
    OperationButtonComponent,
    LogiAssignedParcelsComponent,
    CourierListComponent,
    ToastsContainer,
    CourierParcelsComponent,
    LogoutComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    LoadingBarHttpClientModule
  ],
  providers: [NgbActiveModal,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorServiceService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
