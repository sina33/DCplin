import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { Action } from "../../models/action";
import { CreateAction } from "./modals/create-action";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: NativeStorage, private modalCtrl: ModalController) {

  }

  createAction(): void {
    let craeteActionModal = this.modalCtrl.create(CreateAction)
    craeteActionModal.present()
  }
}