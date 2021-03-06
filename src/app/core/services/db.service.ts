import { Injectable } from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DbService {

  constructor(private db: AngularFireDatabase) { }

  add(object: any, list: string) {
    this.db.list(list).push(object)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  update(object: any, key: string, list: string) {
    this.db.list(list).update(key, object)
    .catch((error: any) => {
      console.error(error);
    });
  }

  getAll(list: string) : Observable<any>{
    return Observable.create( async emiter=>{
        const response = await this.db.list(list)
         .snapshotChanges()
         .pipe(
          map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          })
         );
         if(response){
            emiter.next(response)
         } else{
         }
         emiter.error("algo deu errado")
         emiter.complete("completou a requisição")
    }
    )
    // return this.db.list(list)
    // .snapshotChanges()
    // .pipe(
    //   map(changes => {
    //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   })
    // );
  }

  delete(key: string, list: string) {
    this.db.object(`${list}/${key}`).remove()
  }
}
