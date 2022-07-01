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


  constructor(private http: HttpClient) {}
  currentpost : Post = new Post();

  public checkdb(newpost: Post) {
    console.log("hey from service");
    console.log(newpost);
    //return( this.http.put(this.baseurl, newpost));
    // return this.http.get(this.baseurl);
  }

  public getPost() {
    console.log("getpost from service");
    return this.http.get(this.baseurl);
  }

  public createPost(newpost: Post) {
    console.log("hey from createpost postservice");
    console.log(this.baseurl, newpost, this.http);
    return this.http.post(this.baseurl, newpost);
  }



}
