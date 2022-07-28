import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company/company.service';
import { AdministratorService } from 'src/app/service/administrator/administrator.service';
import { ProductService } from 'src/app/service/product/product.service';


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})



export class AdministratorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  administratorForm: FormGroup;
  administrators: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'lastname','email', 'phone', 'options'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public companyService: CompanyService,
    public productService: ProductService,
    public administratorService: AdministratorService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.administratorForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.getAdministrators();
   

  }

  setDataAndPagination() {
    this.dataSource = new MatTableDataSource(this.administrators);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAdministrators() {
    this.administrators = [];
    this.administratorService.getAllAdministrators().subscribe(res => {
      this.administrators = res;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  addAdministrator() {
    const administrator = {
      name: this.administratorForm.value.name,
      lastname: this.administratorForm.value.lastname,
      password: this.administratorForm.value.password,
      email: this.administratorForm.value.email,
      phone: this.administratorForm.value.phone
    }

    this.administratorService.saveAdministrator(administrator).subscribe((data) => {
      this.administrators= this.administrators.filter((administrator: { id: number; }) => data.id !== data.id)

      this.administrators.push(data);
      this.ngOnInit();
    },
      error => { console.error(error) }
    )
  }


  delete(id: number) {
    if (confirm('¿De verdad quiere eliminar?')) {
      this.administratorService.deleteAdministrator(id).subscribe((data) => {
        this.ngOnInit();
      },
        error => { console.error(error) }
      )
    }
  }

  fillData(oldDataAdministrator: any) {
    this.administratorForm.setValue({
      id: oldDataAdministrator.id,
      name: oldDataAdministrator.name,
      lastname: oldDataAdministrator.lastname,
      password: oldDataAdministrator.password,
      email: oldDataAdministrator.email,
      phone: oldDataAdministrator.phone
    })

    console.log(this.administratorForm)
  }

  editAdministrator() {
    const administrator = {
      id: this.administratorForm.value.id,
      name: this.administratorForm.value.name,
      lastname: this.administratorForm.value.lastname,
      password: this.administratorForm.value.password,
      email: this.administratorForm.value.email,
      phone: this.administratorForm.value.phone
    }

    console.log(administrator)
    this.administratorService.editAdministrator(administrator).subscribe(data => {
      this.ngOnInit();
    })
  }

}
