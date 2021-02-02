import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormService, EventService } from '../../service';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  @Input() name: string;
  @Input() phone: string;
  @Input() email: string;
  @ViewChild('inputId', {  static: false })  inputElement: IonInput;

  form: any;

  constructor(
    private formService: FormService,
    private modalCtrl: ModalController,
    private event: EventService
  ) { 
    
  }

  ngOnInit() {
    this.form = this.formService.customerForm({name:this.name,phone:this.phone,email:this.email});
  }

  ionViewDidEnter() {
      setTimeout(() => {
         this.inputElement.setFocus();
    }, 10);
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  save(){
    this.event.publish('bill:customer',this.form.value)
    this.modalCtrl.dismiss();
  }

}
