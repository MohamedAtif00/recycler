import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CategoryService } from '../../../shared/service/category.service';
import { Category } from '../../../shared/model/category.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  categoryForm!: FormGroup;
  private modalRef: NgbModalRef | undefined;
  private selectedCategory!:Category | null;
  categories:WritableSignal<Category[]> = signal<Category[]>([]);
  constructor(private categoryServ:CategoryService,
              private modalService:NgbModal,
              private fb: FormBuilder,
              private toastr:ToastrService){}

  ngOnInit(): void {
    this.GetAllCategories()
    
  }

  GetAllCategories()
  {
    this.categoryServ.GetAllCategories().subscribe(data=>{
      this.categories.set(data)
    })

  }

  openCreateCategoryModal(content: any) {
    this.CreateForm('');

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  CreateForm(name:string)
  {
    this.categoryForm = this.fb.group({
      categoryName: [name, [Validators.required]]
    });
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      if(this.selectedCategory)
        {
          debugger;
          this.categoryServ.UpdateCategory({id:this.selectedCategory.id,name:this.categoryForm.value.categoryName}).subscribe(data=>{
            console.log('Category Updated:', data);
            this.modalRef?.close();
            this.selectedCategory = null
            return;

          });
        }
      // Handle the save action (e.g., send the form data to the server)
      this.categoryServ.CreateCategory({name:this.categoryForm.value.categoryName}).subscribe(data=>{
        if(data)
          {
            this.toastr.success('Category Created successfully','succeess');
            this.GetAllCategories();
          }
      });
      console.log('Category created:', this.categoryForm.value);
      this.modalRef?.close();
    }else
    {
        this.toastr.error('There is some thing Wrong','Error')
    }
  }

  closeModal() {
    this.modalRef?.dismiss();
  }

  onModalClose(result: any) {
    // Define what should happen when the modal is closed
    this.selectedCategory = null
    console.log('Modal closed with data:', result);
    // You can perform additional actions here, like refreshing data or updating the UI
  }

  onModalDismiss(reason: any) {
    // Define what should happen when the modal is dismissed
    this.selectedCategory = null
    console.log('Modal dismissed:', reason);
    // You can perform additional actions here, like logging or showing a message
  }

  editCategory(content:any,category:Category)
  {
    this.CreateForm(category.name);
    this.selectedCategory = category

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        // Handle the close action here
        console.log('Modal closed with result:', result);
        this.onModalClose(result);
        this.selectedCategory = null
      },
      (reason) => {
        // Handle the dismiss action here
        console.log('Modal dismissed with reason:', reason);
        this.onModalDismiss(reason);
        this.selectedCategory = null
      }
    )
  }

  deleteCategory(id:number)
  {
    this.categoryServ.DeleteCategory(id).subscribe(data=>{
      this.toastr.success('category deleted','success')
      this.categoryServ.GetAllCategories().subscribe(data=>{
        this.categories.set(data)
      })
    })
  }

  getMaxId(): number {
    if (this.categories().length === 0) {
      return 0; // or handle empty array case as needed
    }
    return Math.max(...this.categories().map(category => category.id));
  }
}
