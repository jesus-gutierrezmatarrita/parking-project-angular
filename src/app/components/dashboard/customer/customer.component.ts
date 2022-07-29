import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company/company.service';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ProductService } from 'src/app/service/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customerForm: FormGroup;
  customers: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'lastname','email', 'phone', 'options'];

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
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    //Obtiene todos los productos
    this.getCustomers();

  }

  setDataAndPagination() {
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

  addCustomer() {
    const customer = {
      name: this.customerForm.value.name,
      lastname: this.customerForm.value.lastname,
      password: this.customerForm.value.password,
      email: this.customerForm.value.email,
      phone: this.customerForm.value.phone
    }

    this.customerService.saveCustomer(customer).subscribe((data) => {
      this.customers = this.customers.filter((customer: { id: number; }) => data.id !== data.id)

      this.customers.push(data);
      this.ngOnInit();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    },
      error => { console.error(error) }
    )
  }


  delete(id: number) {
    Swal.fire({
      title: '¿Desea eliminar este cliente?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.customerService.deleteCustomer(id).subscribe((data) => {
        this.ngOnInit();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El cliente fue borrado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        },
          error => { console.error(error) }
        )
      }
    })
  }

  fillData(oldDataCustomer: any) {
    this.customerForm.setValue({
      id: oldDataCustomer.id,
      name: oldDataCustomer.name,
      lastname: oldDataCustomer.lastname,
      password: oldDataCustomer.password,
      email: oldDataCustomer.email,
      phone: oldDataCustomer.phone
    })

    console.log(this.customerForm)
  }

  editCustomer() {
    const customer = {
      id: this.customerForm.value.id,
      name: this.customerForm.value.name,
      lastname: this.customerForm.value.lastname,
      password: this.customerForm.value.password,
      email: this.customerForm.value.email,
      phone: this.customerForm.value.phone
    }

    console.log(customer)
    this.customerService.editCustomer(customer).subscribe(data => {
      this.ngOnInit();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
