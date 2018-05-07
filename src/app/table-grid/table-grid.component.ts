import { CommonService } from './../services/common.service';
import { CarService } from './../services/carservice';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../app.config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Store} from "@ngrx/store";
import * as Common from '../services/common.action';
import * as fromCommon from '../services/common.reducer';
import * as moment from 'moment';



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
  public selectedCar: any;
  public car = {};
  public newCar: boolean;
  public displayDialog: boolean;
   

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

  onRowSelect(event) {  
    this.newCar = false;
    this.car = this.cloneCar(event.data);
    this.displayDialog = true;
    const dialogRef = this.dialog.open(CreateDialogComponent, {data:this.car});
  }
  
  cloneCar(c) {
    let car = {};
    for (let prop in c) {
        car[prop] = c[prop];
    }
    return car;
  }

}

@Component({
  selector: 'create-table-grid',
  templateUrl: 'create-table-grid.component.html',
})
export class CreateDialogComponent {
  CarForm :FormGroup;
  NewCar:boolean;
  constructor(private commonService:CommonService,private store :Store<any>,
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private formBuilder: FormBuilder,public dialog: MatDialog){
     //console.log(this.passedData);
     if(this.passedData)
     {
      this.NewCar = false;
      this.CarForm = this.formBuilder.group({   
        vin:this.passedData.vin,
        startyear:new Date(this.passedData.startyear),
        endyear:new Date (this.passedData.endyear),
        brand:this.passedData.brand,
        color:this.passedData.color,
        id:this.passedData.id
      });
     }
     else{
       this.NewCar = true;
      this.CarForm = new FormGroup({
        vin:new FormControl('',{
          validators:[Validators.required]
        }),
        startyear: new FormControl(''),
        endyear: new FormControl(''),
        brand:new FormControl(''),
        color:new FormControl(''),
        id:new FormControl('')
      })
     }
  }
  ngOnInit()
  {
    
  }
 
     IDGenerator() {
    
      let length = 8;
      let timestamp = +new Date;
      
      var _getRandomInt = function( min, max ) {
       return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
      }
      
        var ts = timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        
        for( var i = 0; i < length; ++i ) {
         var index = _getRandomInt( 0, parts.length - 1 );
         id += parts[index];	 
        }
        
        return id;
     
    }
 
      

  onSubmit()
  {
    console.log(this.IDGenerator());
    // let  startDate  = new Date(this.CarForm.value.startyear);
    // let  endDate    = new Date(this.CarForm.value.endyear);

    // let startYear = startDate.getFullYear();
    // let endYear = endDate.getFullYear();
      // console.log(moment(this.CarForm.value.startyear).format('DD-MM-YYYY'));
    let CarObj= {
      vin:this.CarForm.value.vin,
      startyear:moment(this.CarForm.value.startyear).format('DD-MM-YYYY'),
      endyear:moment(this.CarForm.value.endyear).format('DD-MM-YYYY'),
      brand:this.CarForm.value.brand,
      color:this.CarForm.value.color,
      id:this.IDGenerator()
    };
    console.log(CarObj); 
    if(this.NewCar)
    {
    this.store.dispatch(new Common.AddCar(CarObj));
    }
    else
    {
      this.store.dispatch(new Common.UpdateCar(CarObj));
    }
    this.dialog.closeAll()
    
    //this.commonService.AddCar();
 }
}
