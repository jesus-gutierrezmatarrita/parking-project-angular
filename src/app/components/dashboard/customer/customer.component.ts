import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  customers: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['customerID', 'name', 'lastName', 'email', 'phone', 'options'];
 
  constructor(
    public fb: FormBuilder,
    public companyService: CompanyService,
    public productService: ProductService,
    public customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) { }
  
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }

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
    this.customerService.getAllCustomers().subscribe(resp => {
      this.customers = resp;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  delete(product: any){/*
    this.productService.deleteProduct(product.productId).subscribe(resp => {
      console.log(resp)
      if(resp===true){
        this.customers.pop(product);
        this.setDataAndPagination();
        this._snackBar.open('Producto eliminado', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }    
    },
      error => { console.error(error) }
    )*/
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
