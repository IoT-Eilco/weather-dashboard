import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit{
  history: any;
  subscription=Subscription.EMPTY;
  constructor(private db:DatabaseService) {
  }
  ngOnInit() {
    this.subscription = this.db.read<any>('history').subscribe((value) => {
      this.history = Object.keys(value).map((key) => [Number(key), value[key]]).slice(-10);
    })
  }
}
