import {Database, objectVal, ref} from "@angular/fire/database";
import {combineLatest, forkJoin, map, Observable} from 'rxjs';
import {traceUntilFirst} from "@angular/fire/performance";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
  }
)
export class DatabaseService {
  constructor(private db: Database) {
  }

  read<T>(reference: string): Observable<T> {
    const doc = ref(this.db, reference);
    return objectVal<T>(doc).pipe(
      traceUntilFirst('database')
    );
  }

  readSync<T>(references: string[]): Observable<[T, T]> {
    return combineLatest<[T, T]>([
      this.read(references[0]),
      this.read(references[1])
    ]).pipe<[T, T]>(
      map<[T, T], [T, T]>((data: [T, T]) => {
        let d1: T = data[0];
        let d2: T = data[1];
        return [d1, d2];
      })
    );
  }

}
