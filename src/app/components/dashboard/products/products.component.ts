import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company/company.service';
import { ProductService } from 'src/app/service/product/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productForm: FormGroup;
  companies: any;
  products: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['productId', 'productName', 'productDescription', 'productPrice', 'productCategory', 'options'];
 
  constructor(
    public fb: FormBuilder,
    public companyService: CompanyService,
    public productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }
  
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }

  ngOnInit(): void {

    const company = new Company();
    company.companyId = 1;
    company.companyName = "Florida Bebidas";
    this.productForm = this.fb.group({

      productId: [''],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCategory: ['', Validators.required],
      company

    });
    
    //Obtiene todos los productos
    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )

  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  guardar(): void {
    this.productService.saveProduct(this.productForm.value).subscribe(resp => {
      this.productForm.reset();
      this.products = this.products.filter((product: { productId: any; }) => resp.productId !== product.productId)
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
    this.productService.deleteProduct(product.productId).subscribe(resp => {
      console.log(resp)
      if(resp===true){
        this.products.pop(product);
        this.setDataAndPagination();
        this._snackBar.open('Producto eliminado', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }    
    },
      error => { console.error(error) }
    )
  }

  edit(product: any){
    this.productForm.setValue({
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      company: product.company
    })

  }

}