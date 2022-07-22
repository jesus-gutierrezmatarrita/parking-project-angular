import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/service/product/product.service';
import { RoleService } from 'src/app/service/role/role.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  roleForm: FormGroup;
  products: any;
  roles: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['roleId', 'roleName', 'options'];
 
  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
    public roleService: RoleService,
    private _snackBar: MatSnackBar
  ) { }
  
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }

  ngOnInit(): void {

    this.roleForm = this.fb.group({

      roleId: [''],
      roleName: ['', Validators.required],
    
    });

    //Obtiene todos los roles
    this.roleService.getAllRoles().subscribe(resp => {
      this.roles = resp;
      console.log(resp);
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )

  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.roles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  save(): void {
    this.productService.saveProduct(this.roleForm.value).subscribe(resp => {
      this.roleForm.reset();
      this.products = this.products.filter((product: { roleId: any; }) => resp.roleId !== product.roleId)
      this._snackBar.open('Producto guardado correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      this.products.push(resp);
      this.setDataAndPagination();
       
    },
      error => { console.error(error) }
    )
  }

  delete(product: any){
    this.productService.deleteProduct(product.roleId).subscribe(resp => {
      console.log(resp)
      if(resp===true){
        this.products.pop(product);
        this.setDataAndPagination();
        this._snackBar.open('Role eliminado', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }    
    },
      error => { console.error(error) }
    )
  }

  edit(role: any){
    this.roleForm.setValue({
      roleId: role.id,
      roleName: role.name,
    })

  }

}
