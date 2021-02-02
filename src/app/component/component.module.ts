import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { DiscountComponent } from './discount/discount.component';
import { ItemComponent } from './item/item.component';
import { TaxComponent } from './tax/tax.component';

@NgModule({
 imports:      [ 
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
],
 declarations: [ 
    CustomerComponent, 
    DiscountComponent, 
    ItemComponent, 
    TaxComponent 
],
 exports:      [ 
    CustomerComponent, 
    DiscountComponent, 
    ItemComponent, 
    TaxComponent ,
    CommonModule 
]
})
export class SharedModule { }