import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

declare var require: any;
var loki = require('lokijs');
var localforage = require('localforage')

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: any;      // LokiJS database
  robots: any;  // our DB's document collection object
  robotName: string;
  robotTVShow: string;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

    this.db = new loki('robotsOnTV');
    this.robots = this.db.addCollection('robots');

    this.robots.insert({ name: 'Bender', tvShow: 'Futurama' });
    this.robots.insert({ name: 'Rosie', tvShow: 'The Jetsons' });
    this.robots.insert({ name: 'K1', tvShow: 'Dr. Who' });

  }



  convert2Array(val) {
    return Array.from(val)
  }

  addDocument() {
    
    if (!this.robotName || !this.robotTVShow) {
      console.log("field is blank!");
      return
    }
    this.robots.insert({ name: this.robotName, tvShow: this.robotTVShow })
    // LokiJS is not zero-indexed, so the final element is at <length>, not <length - 1> 
    console.log("inserted document: ", this.robots.get(this.robots.data.length)); 
    console.log("robots.data.length: " + this.robots.data.length);
  }

  deleteDocument($event, robot) {
    console.log("robot to delete: name = " + robot.name + " TV show = ", robot.tvShow)
    // $loki is the document's index in the collection
    console.log("targeting document at collection index: " + robot.$loki)
    this.robots.remove(robot.$loki)
  }

  saveAll() {
    localforage.setItem('storeKey', JSON.stringify(this.db)).then( function(value){
      console.log('database successfully saved')
    }).catch(function(err){
      console.log('error while saving: ' + err)
    })
  }

  importAll() {
    var self = this
    localforage.getItem('storeKey').then(function(value) {
      console.log('the full database has been retreived')
      self.db.loadJSON(value)
      self.robots = self.db.getCollection('robots')
    }).catch(function(err){
      console.log('error importing database: ' + err)
    })
  }
}