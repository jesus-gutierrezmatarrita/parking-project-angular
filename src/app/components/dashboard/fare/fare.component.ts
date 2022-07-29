import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FareService } from 'src/app/service/fare/fare.service';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.css']
})
export class FareComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fareForm: FormGroup;
  fares: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['slot', 'vehicle','time', 'price', 'options'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public fareService: FareService
  ) { }

  ngOnInit(): void {

    this.fareForm = this.fb.group({
      id: [''],
      slot: ['', Validators.required],
      vehicle: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.getFares();
  }

  setDataAndPagination() {
    this.dataSource = new MatTableDataSource(this.fares);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFares() {
    this.fares = [];
    this.fareService.getAllFares().subscribe(res => {
      this.fares = res;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  addFare() {
    const fare = {
      parkingSlotId: this.fareForm.value.slot,
      vehicleCategoryId: this.fareForm.value.lastname,
      unitTimeId: this.fareForm.value.password,
      price: this.fareForm.value.email
    }

    this.fareService.saveFare(fare).subscribe((data) => {
      this.fares = this.fares.filter((fare: { id: number; }) => data.id !== data.id)

      this.fares.push(data);
      this.ngOnInit();
    },
      error => { console.error(error) }
    )
  }


  delete(id: number) {
    if (confirm('¿De verdad quiere eliminar?')) {
      this.fareService.deleteFare(id).subscribe((data) => {
        this.ngOnInit();
      },
        error => { console.error(error) }
      )
    }
  }

  fillData(oldDataFare: any) {
    this.fareForm.setValue({
      id: oldDataFare.id,
      slot: oldDataFare.parkingSlotId,
      vehicle: oldDataFare.vehicleCategoryId,
      time: oldDataFare.unitTimeId,
      price: oldDataFare.price
    })
  }

  editFare() {
    const fare = {
      id: this.fareForm.value.id,
      parkingSlotId: this.fareForm.value.slot,
      vehicleCategoryId: this.fareForm.value.vehicle,
      unitTimeId: this.fareForm.value.time,
      price: this.fareForm.value.price
    }
    this.fareService.editFare(fare).subscribe(data => {
      this.ngOnInit();
    })
  }

}
