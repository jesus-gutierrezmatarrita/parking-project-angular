import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/service/product/product.service';
import { RoleService } from 'src/app/service/role/role.service';
import Swal from 'sweetalert2';

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

  delete(id: number){
    Swal.fire({
      title: '¿Desea eliminar este rol?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.roleService.deleteRole(id).subscribe((data) => {
        this.ngOnInit();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El rol fue borrado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        },
          error => { console.error(error) }
        )
      }
    })
  }

  editRole() {
    const role = {
      id: this.roleForm.value.id,
      name: this.roleForm.value.name
    }

    console.log(role)
    this.roleService.editRole(role).subscribe(data => {
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

  fillData(oldDataRole: any) {
    this.roleForm.setValue({
      id: oldDataRole.id,
      name: oldDataRole.name
    })
  }

}
