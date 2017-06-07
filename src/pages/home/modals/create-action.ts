import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Action } from "../../../models/action";

@Component({
  selector: 'modal-add-action',
  templateUrl: 'create-action.html'
})
export class CreateAction {
  action: Action
  mode: string
  // actionType: string = 'bool'
  constructor(params: NavParams, private viewCtrl: ViewController) {
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

}