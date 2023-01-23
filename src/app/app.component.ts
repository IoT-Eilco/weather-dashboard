import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Weather Dashboard';
  item: Observable<any>;
  gaugeType = "semi";
  gaugeValue = 17;
  gaugeLabel = "Temperature";
  gaugeAppendText = "°C";
  thresholdConfig = {
        '0': {color: 'blue'},
        '15': {color: 'orange'},
        '30': {color: 'red'}
  };
  markers = { "0":{color:"white",type:"line",label:"0",size:3},"10":{color:"white",type:"line",label:"10",size:3},"20":{color:"white",type:"line",label:"10",size:3},"30":{color:"white",type:"line",label:"30",size:3},"40":{color:"white",type:"line",label:"10",size:3},"50":{color:"white",type:"line",label:"50",size:3} ,"25": { color: "white", type: "triangle", size: 6, label: "Average" } }
  markers2={ "0":{color:"white",type:"line",label:"0",size:3},"20":{color:"white",type:"line",label:"20",size:3},"40":{color:"white",type:"line",label:"40",size:3},"60":{color:"white",type:"line",label:"60",size:3},"80":{color:"white",type:"line",label:"80",size:3},"100":{color:"white",type:"line",label:"100",size:3} ,"50": { color: "white", type: "triangle", size: 6, label: "Average" } }
  constructor(private db: AngularFireDatabase) {
    this.item = db.object('record').valueChanges();
    this.item.subscribe((products) => {
      console.log(products);
    });

  }
  ngOnInit() {

  }

// or

}
