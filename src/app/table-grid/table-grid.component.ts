import { CommonService } from './../services/common.service';
import { CarService } from './../services/carservice';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../app.config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Store} from "@ngrx/store";
import * as Common from '../services/common.action';
import * as fromCommon from '../services/common.reducer'



@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit {
  public cars:any =  [];
  public cols: any[];
  public StartDate:any;
  public EndDate:any;
  public filterResults =[];
   

  constructor(private http:HttpClient,public dialog: MatDialog,private store :Store<any>) {
      
  }

  ngOnInit() {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'startyear', header: 'startyear' },
      { field: 'endyear', header: 'endyear' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];

  this.FetchResults().subscribe((car) =>{
    this.store.dispatch(new Common.SetCar(car.data) );
    //this.cars = car.data
  });
  this.store.select(fromCommon.getAvailableCars).subscribe(data=>{
    console.log(data);
    this.cars= data;
    });
}

  FetchResults():Observable<any>
  {
    return this.http.get(Config.apiEndpoint+'cars-small.json').map((res)=>{
       return res;
    });
  }

  filterByDate()
  {
    var d = new Date();
          console.log(d);
          let  startDate  = new Date(this.StartDate);
          let  endDate    = new Date(this.EndDate);
          //day = date.getDate();
         // month = date.getMonth() + 1;
          let startYear = startDate.getFullYear();
          let endYear = endDate.getFullYear();
         //console.log(startYear);
         //console.log(endYear);

         for(var i = 0; i < this.cars.length; i++)
            {
              if(this.cars[i].startyear == startYear && this.cars[i].endyear == endYear)
              {
                 this.filterResults.push(this.cars[i]); 
              }
            }
            console.log(this.filterResults);

            this.cars = this.filterResults;
  }

  clearFilter()
  {
       this.FetchResults().subscribe((car) =>{
         console.log(car);
         this.cars = car.data; 
       });
  }

  AddNewRow(){
    const dialogRef = this.dialog.open(CreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'create-table-grid',
  templateUrl: 'create-table-grid.component.html',
})
export class CreateDialogComponent {
  CarForm :FormGroup;
  constructor(private commonService:CommonService,private store :Store<any>){

  }
  ngOnInit()
  {
    this.CarForm = new FormGroup({
      vin:new FormControl('',{
        validators:[Validators.required]
      }),
      startyear: new FormControl(''),
      endyear: new FormControl(''),
      brand:new FormControl(''),
      color:new FormControl('')
    })
  }
  onSubmit()
  {
    let  startDate  = new Date(this.CarForm.value.startyear);
    let  endDate    = new Date(this.CarForm.value.endyear);

    let startYear = startDate.getFullYear();
    let endYear = endDate.getFullYear();

    let CarObj= {
      vin:this.CarForm.value.vin,
      startyear:startYear,
      endyear:endYear,
      brand:this.CarForm.value.brand,
      color:this.CarForm.value.color
    };
    this.store.dispatch(new Common.AddCar(CarObj));
    
    //this.commonService.AddCar();
 }
}
