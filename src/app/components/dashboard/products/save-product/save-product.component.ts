import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company/company.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})

export class SaveProductComponent implements OnInit {

  productForm: FormGroup;
  companies: any;
  products: any;
  
  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public companyService: CompanyService,
    public productService: ProductService,
    private router: Router
  ) { }

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
      this.router.navigate(['/dashboard/products'])
      this.products.push(resp);
      
      
    },
      error => { console.error(error) }
    )
  }

}
