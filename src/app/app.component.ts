import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from "./services/database.service";
import {Subscription} from "rxjs";
import {LineData, Record, Sensors, Series} from "./models/live_record";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  data: Sensors<Record> | undefined;
  subscription: Subscription | undefined;
  shownData: Record = { temp: 0, hum: 0 };
  gaugeLabel = "Température";
  gaugeAppendText = "°C";
  tempThresholdConfig = {
    '0': {color: '#003cff'},
    '22': {color: '#ff7f00'},
    '30': {color: '#f50000'}
  };
  humThresholdConfig = {
    '0': {color: '#8ae4f5'},
    '50': {color: '#00deff'},
    '80': {color: '#007281'}
  };
  markers = {
    "0": {color: "white", type: "line", label: "0", size: 3},
    "10": {color: "white", type: "line", label: "10", size: 3},
    "20": {color: "white", type: "line", label: "20", size: 3},
    "30": {color: "white", type: "line", label: "30", size: 3},
    "40": {color: "white", type: "line", label: "40", size: 3},
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

  view: [number, number] = [900, 550];
  lineData: LineData<Series>[] = [
    {
      name: 'Température',
      series: []
    },
    {
      name: 'Humidité',
      series: []
    }]
  gradient = false;
  showLegend = true;

  colorScheme: any = {
    domain: ['#f50000', '#009bb0']
  };

  constructor(private db: DatabaseService) {
  }

  ngOnInit() {
    const sensor1 = 'live_record/sensor1'
    const sensor2 = 'live_record/sensor2'
    this.subscription = this.db.readSync<Record>([sensor1, sensor2]).subscribe((value) => {
      this.data = {sensor1: value[0], sensor2: value[1]};
      console.log(this.data);
      this.shownData = this.measureMean(value[0], value[1])
      this.appendToLine()
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  measureMean(sen1: Record, sen2: Record): Record {
    return { temp: +((sen1.temp + sen2.temp)/2).toFixed(1) , hum: +((sen1.hum + sen2.hum)/2).toFixed(1) }
  }

  appendToLine() {
    this.lineData[0].series.push({name: (this.lineData[0].series.length + 1).toString(), value: this.shownData.temp })
    this.lineData[1].series.push({name: (this.lineData[1].series.length + 1).toString(), value: this.shownData.hum })
    this.lineData = [ ...this.lineData ]
  }

  onSelect(event: any) {
    console.log(this.lineData);
  }

}
