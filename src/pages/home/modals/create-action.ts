import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { Action } from "../../../models/action";

@Component({
  selector: 'modal-add-action',
  templateUrl: 'create-action.html'
})
export class CreateAction {
  action: any
  mode: string
  // actionType: string = 'bool'
  constructor(params: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.mode = params.get('mode')
    if (this.mode == 'create') {
      this.action = new Action('', 1)
    } else {
      this.action = params.get('action')
    }
  }

  onCancel(): void {
    this.viewCtrl.dismiss()
  }

  onSubmit(): void {
    this.viewCtrl.dismiss(JSON.stringify(this.action))
  }

  deleteDocument(): void {
    let msg: string = 'Are you sure you want to delete ' + this.action.name + '.\nAll data for this action will be permanently lost.'
    let alert = this.alertCtrl.create({
      title: 'Warning',
      message: msg,
      buttons: [{
        text: 'Cancel',
        handler: data => {

        }
      }, {
        text: 'Delete',
        handler: data => {
          this.viewCtrl.dismiss({ del: true, loki: this.action.$loki })
        }
      }]
    })
    alert.present()
  }

}