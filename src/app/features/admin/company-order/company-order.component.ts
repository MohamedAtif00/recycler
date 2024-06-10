import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../shared/model/order.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-order',
  templateUrl: './company-order.component.html',
  styleUrl: './company-order.component.css'
})
export class CompanyOrderComponent {
  orderForm: FormGroup;
  modalRef!: NgbModalRef;
  selectedOrder!: Order; // Adjust type as needed
  orders: Order[] = []; // Adjust type as needed

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private orderService: CompanyService,
    private toastr: ToastrService
  ) {
    this.orderForm = this.fb.group({
      buyerEmail: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      deliveryMethodCost: [0, [Validators.required, Validators.min(0)]],
      subTotal: [0, [Validators.required, Validators.min(0)]],
      total: [0, [Validators.required, Validators.min(0)]],
      paymentIntentId: ['', Validators.required],
      shippingAddress: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        street: ['', Validators.required]
      }),
      items: this.fb.array([]) // To handle order items
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.GetOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  openEditModal(content:any, order: Order): void {
    this.selectedOrder = order;
    this.orderForm.patchValue(order);
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(modal:any): void {
    // if (this.orderForm.valid) {
    //   // Update only the desired properties of selectedOrder
    //   const updatedOrder = {
    //     ...this.selectedOrder,
    //     buyerEmail: this.orderForm.value.buyerEmail,
    //     status: this.orderForm.value.status,
    //     deliveryMethod: this.orderForm.value.deliveryMethod,
    //     deliveryMethodCost: this.orderForm.value.deliveryMethodCost,
    //     subTotal: this.orderForm.value.subTotal,
    //     total: this.orderForm.value.total,
    //     paymentIntentId: this.orderForm.value.paymentIntentId,
    //     shippingAddress: this.orderForm.value.shippingAddress,
    //     items: this.orderForm.value.items
    //   };

    //   this.orderService.updateOrder(updatedOrder).subscribe(
    //     data => {
    //       this.toastr.success('Order updated successfully', 'Success');
    //       modal.close();
    //       this.loadOrders(); // Refresh the order list
    //     },
    //     error => {
    //       this.toastr.error('Failed to update order', 'Error');
    //       console.error('Update order error:', error);
    //     }
    //   );
    // }
  }
}
