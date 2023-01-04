import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Projet-angular';
  item: Observable<any>;

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
