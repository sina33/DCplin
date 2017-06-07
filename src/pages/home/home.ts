import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import LocalForage from "localforage";
import Loki from "lokijs"

import { Action } from "../../models/action";
import { CreateAction } from "./modals/create-action";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: Loki;      // LokiJS database
  actions: LokiCollection<Object>;  // our DB's document collection object
  records: LokiCollection<Object>;
  todayScore: number

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
    this.db = new Loki('DCplin-db');
    this.actions = this.db.addCollection('actions');
    this.records = this.db.addCollection('records');
    this.todayScore = 0
    // this.dummyObjectInsertDatabase()
    this.importAll()
  }


  convert2Array(val) {
    return Array.from(val)
  }

  deleteDocument($event, action) {
    console.log("action to delete: ", action)
    // $loki is the document's index in the collection
    console.log("targeting document at collection index: " + action.$loki)
    this.actions.remove(action.$loki)
  }

  saveAll() {
    LocalForage.setItem('storeKey', JSON.stringify(this.db)).then(function (value) {
      console.log('database successfully saved')
    }).catch(function (err) {
      console.log('error while saving: ' + err)
    })
  }

  importAll() {
    var self = this
    LocalForage.getItem('storeKey').then(function (value) {
      console.log('the full database has been retreived')
      self.db.loadJSON(value as string)
      self.actions = self.db.getCollection('actions')
    }).catch(function (err) {
      console.log('error importing database: ' + err)
    })
  }

  dummyObjectInsertDatabase() {
    this.actions.insert({ name: 'Push-up', categories: 'health', do_score: 12, state: 0 });
    this.actions.insert({ name: 'Attending Work', categories: 'discipline', do_score: 55, state: 0 });
    this.actions.insert({ name: 'Water', categories: 'health', do_score: 3, state: 0 });
  }

  createAction() {
    let actionModal = this.modalCtrl.create(CreateAction, { mode: 'create' })
    actionModal.present()

    actionModal.onDidDismiss(data => {
      if (data) {
        let actionObj = JSON.parse(data) as Action
        this.actions.insert({ name: (actionObj as Action).name, do_score: actionObj.do_score, state: 0 })
        console.log("inserted document: ", this.actions.get(this.actions.data.length));
        console.log("robots.data.length: " + this.actions.data.length);
      }
    })
  }

  modifyAction(actionObj) {
    let actionModal = this.modalCtrl.create(CreateAction, { mode: 'edit', action: actionObj })
    actionModal.present()

    actionModal.onDidDismiss(data => {
      if (data) {
        let actionObj = JSON.parse(data) as Action
        this.actions.update(actionObj)
        console.log("inserted document: ", this.actions.get(this.actions.data.length));
        console.log("robots.data.length: " + this.actions.data.length);
      }
    })
    this.calculateTodaysScore()
  }

  createGoal() {

  }

  changeActionState(action) {
    action.state = (action.state + 2) % 3 - 1
    this.actions.update(action)
    this.calculateTodaysScore()
  }

  state2icon(state: number): string {
    if (state < 0) {
      return 'close-circle'
    } else if (state == 0) {
      return 'remove-circle'
    }
    return 'checkmark-circle'
  }

  state2color(state: number): string {
    if (state < 0) return 'dark'
    else if (state == 0) return 'light'
    else return 'secondary'
  }

  calculateTodaysScore() {
    this.todayScore = 0
    this.actions.data.forEach(elem => {
      // console.log(elem)
      if ((elem as Action).state == 1) {
        this.todayScore += Number( (elem as Action).do_score ) 
      }
    })
  }
}