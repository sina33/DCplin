import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import Loki from "lokijs"
import LocalForage from "localforage";



/*
  Generated class for the LokiDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LokiDbProvider {
  db: Loki

  constructor(public http: Http) {
    console.log('Hello LokiDbProvider Provider');
    this.db = new Loki('DCplin-db')
  }

  getDB(): Loki {
    return this.db
  }


}
