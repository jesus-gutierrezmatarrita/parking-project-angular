import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SaveProductComponent } from './products/save-product/save-product.component';
import { CustomerComponent } from './customer/customer.component';
import { RoleComponent } from './role/role.component';
import { FareComponent } from './fare/fare.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    NavbarComponent,
    SaveProductComponent,
    CustomerComponent,
    RoleComponent,
    FareComponent,
    VehicleComponent,
    IndexComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
