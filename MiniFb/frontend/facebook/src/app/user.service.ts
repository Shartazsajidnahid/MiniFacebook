
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from './CurrentUser';
import { environment } from './environments/environment';
import { Post } from './post';
import { story } from './story';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  newUser: User = {
    fullName: "",
    email: "",
    password: ""
  };

  potentialUser = {
    email: "", 
    password: ""
  };

  currentUser: CurrentUser = new CurrentUser();
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  storyHeader = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });

  constructor(private http: HttpClient) { }

  postUser() {
    return this.http.post( 'http://localhost:8080'+ '/auth/register', this.newUser, this.noAuthHeader);
  }

  authUser(potentialUser: { email: string; password: string; }) {
    return this.http.post('http://localhost:8080'+ '/auth/login', potentialUser, this.noAuthHeader);
  }

  loadUser(user: User) {
    this.newUser = user;
  }

  loadPotentialUser(user: User) {
    this.potentialUser.email = user.email;
    this.potentialUser.password = user.password;
  }

  setLoggedUser(name: string, email: string) {
    this.currentUser.fullName = name;
    this.currentUser.email = email;
  }

  setToken(token: any) {
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  
  getLoggedUser() {
    this.currentUser.email = String(localStorage.getItem('tokenEmail'));
    this.currentUser.fullName = String(localStorage.getItem('tokenName'));
    return this.currentUser;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserProfile(){
    return this.http.get('http://localhost:8080'+ '/auth/userProfile');
  }

  getUserPayload() {
    let token = localStorage.getItem('token');
    if (token) {
      let payLoad: string = window.atob(token.split('.')[1]);
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

  getUserPosts(): Observable<Post[]> {
    const toAdd: any = { 'email': this.currentUser.email };
    let header = new HttpHeaders(toAdd);
    return this.http.get<Post[]>('http://localhost:8080' + '/post', this.noAuthHeader)
  }

  postStatus(newStatus: Post) {
    console.log(newStatus)
    return this.http.post('http://localhost:8080' + '/post', this.noAuthHeader);
  }


}
