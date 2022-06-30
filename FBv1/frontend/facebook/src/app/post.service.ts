import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  // users: User[] = [
  //   {phone: "017171", name: 'Debi', userid: "db1", email: "debi@gmai.com", password: "123"},
  // ];

  readonly baseurl = "http://localhost:3000/post/";


  constructor(private http: HttpClient) { }
  currentpost : Post = new Post();

  public checkdb(newpost: Post) {
    console.log("hey");
    console.log(newpost);
    //return( this.http.put(this.baseurl, newpost));
    // return this.http.get(this.baseurl);
  }

  public getPost(newpost: Post) {
    console.log("hey");
    console.log(newpost);
    return this.http.put(this.baseurl, newpost);
  }

  public userregistration(newpost: Post) {
    console.log("hey");
    console.log(this.baseurl, newpost, this.http);
    return this.http.post(this.baseurl, newpost);
  }



}
