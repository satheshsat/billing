import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormService, EventService } from '../../service';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  @Input() name: string;
  @Input() price: BigInteger;
  @Input() quantity: BigInteger;
  @Input() unit: string;
  @Input() index: BigInteger;
  @ViewChild('inputId', {  static: false })  inputElement: IonInput;

  form: any;

  constructor(
    private formService: FormService,
    private modalCtrl: ModalController,
    private event: EventService
  ) { 
    
  }

  ngOnInit() {
    this.form = this.formService.itemForm({
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      unit: this.unit
    });
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
    this.event.publish('bill:item',{...this.form.value,...{index:this.index}})
    this.modalCtrl.dismiss();
  }

}
