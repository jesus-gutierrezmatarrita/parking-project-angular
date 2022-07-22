import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductsComponent } from './products/products.component';
import { SaveProductComponent } from './products/save-product/save-product.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    { path: '', component: InicioComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'save-product', component: SaveProductComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
