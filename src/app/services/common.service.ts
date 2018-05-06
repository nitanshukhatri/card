import { AddCar } from './common.action';
import { Injectable } from "@angular/core";
import {Store} from "@ngrx/store";
import * as Common from './common.action';

@Injectable()
export class CommonService {
 constructor(private store :Store<any> ){

 }
 AddCar(CarObj)
 {
   console.log(CarObj)
  
   this.store.dispatch(new Common.AddCar(CarObj));
 }

}