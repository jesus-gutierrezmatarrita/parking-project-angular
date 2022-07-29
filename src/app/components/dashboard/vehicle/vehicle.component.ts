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
  displayedColumns: string[] = ['license_plate', 'car_brand','car_model', 'color', 'category_id', 'options'];

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
      license_plate: ['', Validators.required],
      car_brand: ['', Validators.required],
      car_model: ['', Validators.required],
      color: ['', Validators.required],
      category_id: ['', Validators.required]
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
      license_plate: this.vehicleForm.value.license_plate,
      car_brand: this.vehicleForm.value.car_brand,
      car_model: this.vehicleForm.value.car_model,
      color: this.vehicleForm.value.color,
      category_id: this.vehicleForm.value.category_id
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
      license_plate: oldDataVehicle.license_plate,
      car_brand: oldDataVehicle.car_brand,
      car_model: oldDataVehicle.car_model,
      color: oldDataVehicle.color,
      category_id: oldDataVehicle.category_id
    })

    console.log(this.vehicleForm)
  }

  editVehicle() {
    const vehicle = {
      id: this.vehicleForm.value.id,
      license_plate: this.vehicleForm.value.license_plate,
      car_brand: this.vehicleForm.value.car_brand,
      car_model: this.vehicleForm.value.car_model,
      color: this.vehicleForm.value.color,
      category_id: this.vehicleForm.value.category_id
    }

    console.log(vehicle)
    this.vehicleService.editVehicle(vehicle).subscribe(data => {
      this.ngOnInit();
    })
  }
}
