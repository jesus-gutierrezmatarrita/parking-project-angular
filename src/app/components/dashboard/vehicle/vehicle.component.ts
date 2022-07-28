import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  vehicleForm: FormGroup;
  vehicles: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['plate', 'brand','model', 'color', 'category', 'options'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public vehicleService: VehicleService
  ) { }

  ngOnInit(): void {

    this.vehicleForm = this.fb.group({
      id: [''],
      plate: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required]
    });

    //Obtiene todos los productos
    this.getVehicles();

  }

  setDataAndPagination() {
    this.dataSource = new MatTableDataSource(this.vehicles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getVehicles() {
    this.vehicles = [];
    this.vehicleService.getAllVehicles().subscribe(res => {
      this.vehicles = res;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  addVehicle() {
    const vehicle = {
      plate: this.vehicleForm.value.plate,
      brand: this.vehicleForm.value.brand,
      model: this.vehicleForm.value.model,
      color: this.vehicleForm.value.color,
      category: this.vehicleForm.value.category
    }

    this.vehicleService.saveVehicle(vehicle).subscribe((data) => {
      this.vehicles = this.vehicles.filter((vehicle: { id: number; }) => data.id !== data.id)

      this.vehicles.push(data);
      this.ngOnInit();
    },
      error => { console.error(error) }
    )
  }


  delete(id: number) {
    if (confirm('¿De verdad quiere eliminar?')) {
      this.vehicleService.deleteVehicle(id).subscribe((data) => {
        this.ngOnInit();
      },
        error => { console.error(error) }
      )
    }
  }

  fillData(oldDataVehicle: any) {
    this.vehicleForm.setValue({
      id: oldDataVehicle.id,
      plate: oldDataVehicle.plate,
      brand: oldDataVehicle.brand,
      model: oldDataVehicle.model,
      color: oldDataVehicle.color,
      category: oldDataVehicle.category
    })

    console.log(this.vehicleForm)
  }

  editVehicle() {
    const vehicle = {
      id: this.vehicleForm.value.id,
      plate: this.vehicleForm.value.plate,
      brand: this.vehicleForm.value.brand,
      model: this.vehicleForm.value.model,
      color: this.vehicleForm.value.color,
      category: this.vehicleForm.value.category
    }

    console.log(vehicle)
    this.vehicleService.editVehicle(vehicle).subscribe(data => {
      this.ngOnInit();
    })
  }
}
