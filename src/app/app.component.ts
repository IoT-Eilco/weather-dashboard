import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from "./services/database.service";
import {Observable, Subscription} from "rxjs";
import {Record, Sensors} from "./models/live_record";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  data: Sensors<Record> | undefined;
  subscription: Subscription | undefined;
  title = 'Weather Dashboard';
  gaugeType = "semi";
  gaugeValue = 17;
  gaugeLabel = "Temperature";
  gaugeAppendText = "°C";
  thresholdConfig = {
    '0': {color: 'blue'},
    '15': {color: 'orange'},
    '30': {color: 'red'}
  };
  markers = {
    "0": {color: "white", type: "line", label: "0", size: 3},
    "10": {color: "white", type: "line", label: "10", size: 3},
    "20": {color: "white", type: "line", label: "10", size: 3},
    "30": {color: "white", type: "line", label: "30", size: 3},
    "40": {color: "white", type: "line", label: "10", size: 3},
    "50": {color: "white", type: "line", label: "50", size: 3},
    "25": {color: "white", type: "triangle", size: 6, label: "Average"}
  }
  markers2 = {
    "0": {color: "white", type: "line", label: "0", size: 3},
    "20": {color: "white", type: "line", label: "20", size: 3},
    "40": {color: "white", type: "line", label: "40", size: 3},
    "60": {color: "white", type: "line", label: "60", size: 3},
    "80": {color: "white", type: "line", label: "80", size: 3},
    "100": {color: "white", type: "line", label: "100", size: 3},
    "50": {color: "white", type: "triangle", size: 6, label: "Average"}
  }

  constructor(private db: DatabaseService) {
  }

  ngOnInit() {
    const sensor1 = 'live_record/sensor1'
    const sensor2 = 'live_record/sensor2'
    this.subscription = this.db.readSync<Record>([sensor1, sensor2]).subscribe((value) => {
      this.data = {sensor1: value[0], sensor2: value[1]};
      console.log(this.data);
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
