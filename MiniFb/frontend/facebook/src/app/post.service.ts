import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Post } from './post';
import { story } from './story';
import { environment } from './environments/environment';





@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  
  // users: User[] = [
  //   {phone: "017171", name: 'Debi', userid: "db1", email: "debi@gmai.com", password: "123"},
  // ];
  readonly storyurl = "http://localhost:3000/story/story";
  readonly storyurl2 = "http://localhost:3000/story";

  readonly baseurl = "http://localhost:3000/post/";

  endPoint = 'http://localhost:3000'; 
  allStatus: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  storyHeader = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });


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
    return this.http.get('http://localhost:8080' + '/post');
  }

  public createPost(newpost: Post) {
    console.log("hey from createpost postservice");
    console.log(this.baseurl, newpost, this.http);
    return this.http.post('http://localhost:8080' + '/post', newpost);
  }

  postStory(story: any): Observable<any>{
    console.log("story");
    return this.http.post('http://localhost:8080' + '/story', story); 
  }

  postStory2(story: any): Observable<any>{
    console.log("story");
    return this.http.post('http://localhost:8080' + '/story', story); 
  }

  getStories(){
    console.log("all the stories here");
    console.log(this.http.get(this.storyurl2));
    return this.http.get('http://localhost:8080' + '/story');
  }
}
