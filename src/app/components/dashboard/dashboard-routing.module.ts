import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard.component';
import { FareComponent } from './fare/fare.component';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';
import { SaveProductComponent } from './products/save-product/save-product.component';
import { RoleComponent } from './role/role.component';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    { path: 'products', component: ProductsComponent},
    { path: 'customer', component: CustomerComponent},
    { path: 'role', component: RoleComponent},
    { path: 'fare', component: FareComponent},
    { path: 'vehicle', component: VehicleComponent},
    { path: 'index', component: IndexComponent},
    { path: 'save-product', component: SaveProductComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
