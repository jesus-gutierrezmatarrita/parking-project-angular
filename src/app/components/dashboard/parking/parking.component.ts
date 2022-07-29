import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company/company.service';
import { ParkingService } from 'src/app/service/parking/parking.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  parkingForm: FormGroup;
  parkings: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'location','capacity',  'options'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public companyService: CompanyService,
    public productService: ProductService,
    public parkingService: ParkingService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.parkingForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', Validators.required]
    });

    //Obtiene todos los productos
    this.getParkings();

  }

  setDataAndPagination() {
    this.dataSource = new MatTableDataSource(this.parkings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getParkings() {
    this.parkings = [];
    this.parkingService.getAllParkings().subscribe(res => {
      this.parkings = res;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  addParking() {
    const parking = {
      name: this.parkingForm.value.name,
      location: this.parkingForm.value.location,
      capacity: this.parkingForm.value.capacity
    }

    this.parkingService.saveParking(parking).subscribe((data) => {
      this.parkings = this.parkings.filter((parking: { id: number; }) => data.id !== data.id)

      this.parkings.push(data);
      this.ngOnInit();
    },
      error => { console.error(error) }
    )
  }


  delete(id: number) {
    if (confirm('¿De verdad quiere eliminar?')) {
      this.parkingService.deleteParking(id).subscribe((data) => {
        this.ngOnInit();
      },
        error => { console.error(error) }
      )
    }
  }

  fillData(oldDataParking: any) {
    this.parkingForm.setValue({
      id: oldDataParking.id,
      name: oldDataParking.name,
      location: oldDataParking.location,
      capacity: oldDataParking.capacity
    })

    console.log(this.parkingForm)
  }

  editParking() {
    const parking = {
      id: this.parkingForm.value.id,
      name: this.parkingForm.value.name,
      location: this.parkingForm.value.location,
      capacity: this.parkingForm.value.capacity
    }

    console.log(parking)
    this.parkingService.editParking(parking).subscribe(data => {
      this.ngOnInit();
    })
  }

}
