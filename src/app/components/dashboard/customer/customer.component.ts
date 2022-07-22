import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company/company.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customerForm: FormGroup;
  customers:any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['customerID', 'name', 'lastName', 'email', 'phone', 'options'];
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public companyService: CompanyService,
    public productService: ProductService,
    public customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.customerForm = this.fb.group({
      id: [''],
      name: [''],
      lastName: [''],
      password: [''],
      email: [''],
      phone: ['']
    });
    
    //Obtiene todos los productos
    this.getCustomers();

  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCustomers() {
    this.customers = [];
    this.customerService.getAllCustomers().subscribe(res => {
      this.customers = res;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  guardar(): void {/*
    this.productService.saveProduct(this.customerForm.value).subscribe(resp => {
      this.customerForm.reset();
      this.customers = this.customers.filter((product: { productId: any; }) => resp.productId !== product.productId)
      this._snackBar.open('Cliente guardado correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      this.customers.push(resp);
      this.setDataAndPagination();
       
    },
      error => { console.error(error) }
    )*/
  }

  delete(id: number){
    if (confirm('¿De verdad quiere eliminar?')){
      this.customerService.deleteCustomer(id).subscribe((data) => {
        this.ngOnInit();
      },
        error => { console.error(error) }
      )
    }
  }

  edit(customer: any){/*
    this.customerForm.setValue({
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      company: product.company
    })*/

  }

}
