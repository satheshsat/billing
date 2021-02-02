import { Component } from '@angular/core';
import { CustomerComponent } from '../component/customer/customer.component';
import { DiscountComponent } from '../component/discount/discount.component';
import { ItemComponent } from '../component/item/item.component';
import { TaxComponent } from '../component/tax/tax.component';
import { BillsService, AlertService, EventService } from '../service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  settings: any;
  bill: any = {
    customer: {},
    item:[],
    tax:[],
    discount:[],
    total: 0
  };

  constructor(
    private billsService: BillsService,
    private alertService: AlertService,
    private event: EventService
  ) {
    this.loadEvents();
  }

  loadEvents(){
    this.event.subscribe('bill:customer',(customer)=>{
      this.bill.customer = customer;
    })

    this.event.subscribe('bill:item',(item)=>{
      let index = 0;
      if(item.index)
        index = item.index;
      delete item.index;
      item.total_price = item.quantity * item.price;
      
      if(index){
        this.bill.total -= this.bill.item[index-1].total_price;
        this.bill.item[index-1] = item;
      }else{
        this.bill.item.push(item);
      }
      this.bill.total += item.total_price;
    })

    this.event.subscribe('bill:tax',(tax)=>{
      let index = 0;
      if(tax.index)
        index = tax.index;
      delete tax.index;

      if(index){
        this.bill.total -= this.bill.tax[index-1].price;
        this.bill.tax[index-1] = tax;
      }else{
        this.bill.tax.push(tax);
      }
      this.bill.total += tax.price;
    })

    this.event.subscribe('bill:discount',(discount)=>{
      let index = 0;
      if(discount.index)
        index = discount.index;
      delete discount.index;

      if(index){
        this.bill.total += this.bill.discount[index-1].price;
        this.bill.discount[index-1] = discount;
      }else{
        this.bill.discount.push(discount);
      }

      this.bill.total -= discount.price;
    })

  }

  addCustomer(){
    this.alertService.createModal({component: CustomerComponent})
  }

  addItem(){
    this.alertService.createModal({component: ItemComponent});
  }

  addTax(){
    this.alertService.createModal({component: TaxComponent});
  }

  addDiscount(){
    this.alertService.createModal({component: DiscountComponent})
  }

  editCustomer(){
    this.alertService.createModal({
      component: CustomerComponent,
      componentProps: this.bill.customer
    })
  }

  editItem(n){
    this.alertService.createModal({
      component: ItemComponent,
      componentProps: {...this.bill.item[n],...{ index: n+1 }}
    })
  }

  editTax(n){
    this.alertService.createModal({
      component: TaxComponent,
      componentProps: {...this.bill.tax[n],...{ index: n+1 }}
    })
  }

  editDiscount(n){
    this.alertService.createModal({
      component: DiscountComponent,
      componentProps: {...this.bill.discount[n],...{ index: n+1 }}
    })
  }

  deleteCustomer(){
    this.bill.customer = {};
  }

  deleteItem(n){
    this.bill.total -= this.bill.item[n].total_price;
    this.bill.item.splice(n,1);
  }

  deleteTax(n){
    this.bill.total -= this.bill.tax[n].price;
    this.bill.tax.splice(n,1);
  }

  deleteDiscount(n){
    this.bill.total += this.bill.discount[n].price;
    this.bill.discount.splice(n,1);
  }

  save(){
    this.billsService.save(this.bill);
  }

}
