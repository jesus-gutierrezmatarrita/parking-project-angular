import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company/company.service';
import { OperatorService } from 'src/app/service/operator/operator.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  operatorForm: FormGroup;
  operators: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'lastname','email', 'phone', 'options'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public companyService: CompanyService,
    public productService: ProductService,
    public operatorService: OperatorService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.operatorForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    //Obtiene todos los productos
    this.getOperators();

  }

  setDataAndPagination() {
    this.dataSource = new MatTableDataSource(this.operators);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getOperators() {
    this.operators = [];
    this.operatorService.getAllOperators().subscribe(res => {
      this.operators = res;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  addOperator() {
    const operator = {
      name: this.operatorForm.value.name,
      lastname: this.operatorForm.value.lastname,
      password: this.operatorForm.value.password,
      email: this.operatorForm.value.email,
      phone: this.operatorForm.value.phone
    }

    this.operatorService.saveOperator(operator).subscribe((data) => {
      this.operators = this.operators.filter((operator: { id: number; }) => data.id !== data.id)

      this.operators.push(data);
      this.ngOnInit();
    },
      error => { console.error(error) }
    )
  }


  delete(id: number) {
    if (confirm('¿De verdad quiere eliminar?')) {
      this.operatorService.deleteOperator(id).subscribe((data) => {
        this.ngOnInit();
      },
        error => { console.error(error) }
      )
    }
  }

  fillData(oldDataOperator: any) {
    this.operatorForm.setValue({
      id: oldDataOperator.id,
      name: oldDataOperator.name,
      lastname: oldDataOperator.lastname,
      password: oldDataOperator.password,
      email: oldDataOperator.email,
      phone: oldDataOperator.phone
    })

    console.log(this.operatorForm)
  }

  editOperator() {
    const operator = {
      id: this.operatorForm.value.id,
      name: this.operatorForm.value.name,
      lastname: this.operatorForm.value.lastname,
      password: this.operatorForm.value.password,
      email: this.operatorForm.value.email,
      phone: this.operatorForm.value.phone
    }

    console.log(operator)
    this.operatorService.editOperator(operator).subscribe(data => {
      this.ngOnInit();
    })
  }

}
