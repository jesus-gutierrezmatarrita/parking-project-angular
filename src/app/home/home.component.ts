import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../model/company.model';
import { AdministratorService } from '../service/administrator/administrator.service';
import { CompanyService } from '../service/company/company.service';
import { ProductService } from '../service/product/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productForm: FormGroup;
  companies: any;
  products: any;
  
  constructor(
    public fb: FormBuilder,
    public administratorService: AdministratorService,
    public companyService: CompanyService,
    public productService: ProductService
  ) {
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

    this.companyService.getAllCompanies().subscribe(resp => {
      this.companies = resp;
      console.log(resp);

    },
      error => { console.error(error) }
    )

    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp;
      
    },
      error => { console.error(error) }
    )

  }

  guardar(): void {
    this.productService.saveProduct(this.productForm.value).subscribe(resp => {
      this.productForm.reset();
      this.products = this.products.filter((product: { productId: any; }) => resp.productId !== product.productId)
      this.products.push(resp);
      
    },
      error => { console.error(error) }
    )
  }

  delete(product: any){
    this.productService.deleteProduct(product.productId).subscribe(resp => {
      console.log(resp)
      if(resp===true){
        this.products.pop(product);
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
