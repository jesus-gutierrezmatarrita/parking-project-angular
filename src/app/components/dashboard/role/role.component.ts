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
  
  ngOnInit(): void {

    this.roleForm = this.fb.group({

      id: [''],
      name: ['', Validators.required],
    
    });

    //Obtiene todos los roles
    this.roleService.getAllRoles().subscribe(resp => {
      this.roles = resp;
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

  addRole() {
    const role = {
      name: this.roleForm.value.name
    }

    this.roleService.saveRole(role).subscribe((data) => {
      this.roles = this.roles.filter((role: { id: number; }) => data.id !== data.id)

      this.roles.push(data);
      this.ngOnInit();

      this._snackBar.open('Role guardado correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    },
      error => { console.error(error) }
    )
  }

  delete(id: number){
    if (confirm('¿Está seguro de que desea eliminar el registro?')){
      this.roleService.deleteRole(id).subscribe((data) => {
        this.ngOnInit();
        
        this._snackBar.open('Role eliminado', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        
      },
        error => { console.error(error) }
      )
    }
  }

  editRole() {
    const role = {
      id: this.roleForm.value.id,
      name: this.roleForm.value.name
    }

    console.log(role)
    this.roleService.editRole(role).subscribe(data => {
      this.ngOnInit();

      this._snackBar.open('Role editado correctamente', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    })
  }

  fillData(oldDataRole: any) {
    this.roleForm.setValue({
      id: oldDataRole.id,
      name: oldDataRole.name
    })
  }

}
