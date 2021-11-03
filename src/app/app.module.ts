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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from './modals/register-page/register-page.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { NewWarehouseComponent } from './modals/new-warehouse/new-warehouse.component';
import { NewGlobalWarehouseComponent } from './modals/new-global-warehouse/new-global-warehouse.component';

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
    NewGlobalWarehouseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'warehouse', component: WarehousePageComponent}
    ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
