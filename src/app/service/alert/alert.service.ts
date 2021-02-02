import { Injectable } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  async createModal( args: any ){
    const modal = await this.modalController.create(args);
    return await modal.present();
  }

  async createLoader(args){
    const loading = await this.loadingCtrl.create(args);

    await loading.present();
    return loading;
  }

  async createToast(args){
    const toast = await this.toastCtrl.create(args);
    toast.present();
  }

}
