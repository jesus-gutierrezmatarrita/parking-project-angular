import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FareService } from 'src/app/service/fare/fare.service';
import Swal from 'sweetalert2';

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
  displayedColumns: string[] = ['slot', 'vehicle', 'time', 'price', 'options'];

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
      title: '¿Desea eliminar esta tarifa?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fareService.deleteFare(id).subscribe((data) => {
          this.ngOnInit();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La tarifa fue borrada exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        },
          error => { console.error(error) }
        )
      }
    })
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
