import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { Action } from "../../../models/action";

@Component({
  selector: 'modal-add-action',
  templateUrl: 'create-action.html'
})
export class CreateAction {
  action: Action 
  actionType: string = 'bool'
  constructor(params: NavParams, private viewCtrl: ViewController) { 
    this.action = new Action('', 1)
  }

  onCancel(): void {
    this.viewCtrl.dismiss()
  }

  onSubmit(): void {
    this.viewCtrl.dismiss( JSON.stringify(this.action) )
  }

}