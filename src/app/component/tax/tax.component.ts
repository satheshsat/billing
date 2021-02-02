import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormService, EventService } from '../../service';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
})
export class TaxComponent implements OnInit {

  @Input() name: string;
  @Input() price: BigInteger;
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
    this.form = this.formService.taxForm({name:this.name,price:this.price});
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
    this.event.publish('bill:tax',{...this.form.value,...{index:this.index}})
    this.modalCtrl.dismiss();
  }

}
