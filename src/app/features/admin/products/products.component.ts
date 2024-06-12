import { Component, OnInit, TemplateRef, ViewChild, computed } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { Product } from '../../../shared/model/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../shared/service/category.service';
import { Category } from '../../../shared/model/category.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

   baseUrl = 'https://localhost:7236/'
  productForm!: FormGroup;
  closeResult: string = '';
   modalRef!:NgbModalRef;

   updateMode!:boolean;
   selectedProduct!:Product;

  categories!:Category[];
  selectedCategory?:Category;
  products!:Product[];
  constructor(private prodctServ:ProductService,
              private fb:FormBuilder,
              private modalService:NgbModal,
              private categoryServ:CategoryService,
              private toastr:ToastrService){}

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      picture: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      inventory: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });

    //this.products = this.prodctServ.products()  
    console.log('products',this.prodctServ.products());
    this.loadProducts()
    this.loadCategories()
    
  }

  loadCategories()
  {
    this.categoryServ.GetAllCategories().subscribe(data=>{
        this.categories = data;
    })
  }

  loadProducts(): void {
    this.prodctServ.GetProducts(null).subscribe(data => {
      console.log(data);
  
      // Assuming data contains the products
      this.products = data.map((p: any) => {
        return {
          ...p,
          pictureUrl: p.pictureUrl
        };
      });
  
      console.log('products', this.products);
    });
  }
  

  editProduct(product:Product,content:any)
  {
    this.selectedProduct = product;
    console.log('selected product',this.selectedProduct);
    
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

    this.productForm = this.fb.group({
      name: [product.name, Validators.required],
      pictureUrl: [product.pictureUrl, Validators.required],
      price: [product.price, [Validators.required, Validators.min(0)]],
      inventory: [product.inventory, [Validators.required, Validators.min(0)]],
      category: [product.category, Validators.required]
    });

    this.updateMode = true;

  } 

  deleteProduct(id: number): void {
    this.prodctServ.DeleteProduct(id).pipe(
      catchError(error => {
        this.toastr.success('Product deleted successfully', 'Success');
        this.loadProducts()
        console.error('DeleteProduct error:', error);
        return of(null); // Return a fallback value as needed
      })
    ).subscribe(data => {
      if (data) {
        this.toastr.success('Product deleted successfully', 'Success');
        this.loadProducts();
      }
    });
  }


  CreateProduct() {

    if(!this.updateMode)
      {

        this.prodctServ.GetProducts().pipe(
          catchError(error => {
            this.toastr.error('Failed to fetch products', 'Error');
            console.error('GetProducts error:', error);
            return of([]); // Return an empty array or handle the fallback as needed
          })
        ).subscribe(data => {
          let product: Product = <Product>this.productForm.value;
          product.id = this.getMaxId() + 1;
          product.picture = this.fileBlob

          if (this.selectedCategory) {
            product.category = this.selectedCategory.name;
            product.categoryId = this.selectedCategory.id.toString();
          }
    
          this.prodctServ.CreateProduct(product).pipe(
            catchError(error => {
              this.toastr.success('Product Created', 'Success');
            this.modalRef.close();
            this.loadProducts()
              console.error('CreateProduct error:', error);
              return of(null); // Return a fallback value as needed
            })
          ).subscribe(data => {
            console.log(data);
            this.toastr.success('Product Created', 'Success');
            this.modalRef.close();
          });
        });
      }else{
        let updateProduct:Product =  {
                          ...this.selectedProduct,
                          name: this.productForm.value.name,
                          picture: this.productForm.value.picture,
                          price: this.productForm.value.price,
                          inventory: this.productForm.value.inventory,
                          category: this.productForm.value.category
                        };
        // this.selectedProduct  = <Product>this.productForm.value;
        // this.selectedProduct = 
        if (this.selectedCategory) {
          updateProduct.category = this.selectedCategory.name;
          updateProduct.categoryId = this.selectedCategory.id.toString();
        }
        console.log('updated product',updateProduct);
        
        this.prodctServ.EditProduct(updateProduct).pipe(
          catchError(error => {
            this.toastr.success('Product Updated', 'Success');
          this.modalRef.close();
          this.loadProducts()
            console.error('CreateProduct error:', error);
            return of(null); // Return a fallback value as needed
          })
        ).subscribe(data=>{
          console.log(data);
          
        })
        this.updateMode = false
      }
  }

  selectCategory(e:Event)
  {
    let category = (e.target as HTMLSelectElement).value 

    this.selectedCategory = this.categories.find(c =>c.name == category)
    
  } 

  open(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      console.log('Submitted Product:', product);
      // Handle the form submission logic here
      this.CreateProduct()
    }
  }


  selectedFile: File | null = null;
  fileBlob: Blob | null = null;

  SelectedFile(event:Event)
  { 
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.convertFileToBlob(this.selectedFile).then(blob => {
        this.fileBlob = blob;
      }).catch(error => {
        console.error('Error converting file to Blob:', error);
      });
    }
  }

  private convertFileToBlob(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Blob([arrayBuffer], { type: file.type }));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  getProduct()
  {
    return this.productForm.value;
  }

  getMaxId()
  {
      return Math.max(...this.products.map(product =>product.id))
  }

}
