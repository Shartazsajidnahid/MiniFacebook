import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getUserPayload() {
    let token = localStorage.getItem('token');
    if (token) {
      let payLoad: string = atob(token.split('.')[1]);
      return JSON.parse(payLoad);
    }
    else {
      return null;
    }
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    else return false;
  }

}
