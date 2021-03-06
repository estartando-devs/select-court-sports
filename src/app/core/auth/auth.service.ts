import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { DbService } from 'services/db.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: Observable<any>

  constructor(private db: DbService,private afAuth: AngularFireAuth) {
    this.isLogged = afAuth.authState.pipe(map(user=>!!user))
  }

  login(email: string, password: string ){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  loginSocial() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  }

  logoutSocial() {
    return this.afAuth.auth.signOut();
  }

  async signup(user){
    await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    await this.db.add({...user, password: null, confirmPassword: null}, "user")
    this.login(user.email, user.password)
  }

}
