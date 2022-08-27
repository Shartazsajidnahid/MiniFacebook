import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private PostService: PostService, private router: Router, private userservice : UserService) { }

  newpost = new Post();
  currentUserName: String = "";

  postArr: Post[] = [];
  userdetails: any;
  ngOnInit(): void {
    this.setCurrentUserName();
    this.getPosts();
    // this.currentUserId = this.userservice.getToken();
  }

  setCurrentUserName(){
    // this.currentUserName = this.userservice.getLoggedUser().fullName;
    this.userservice.getUserProfile().subscribe(
      (res:any) => {
        console.log("res");
        console.log(res);
        this.userdetails = res['user'];
        this.currentUserName = this.userdetails.fullName;
        console.log("user details: ");
        console.log(this.currentUserName);
        console.log(this.userdetails);

      },
      (err: any) => {
        console.log("error");
      }
    )
    
    // console.log(this.currentUserName);

    
  }

  getPosts(){
    this.userservice.getUserPosts().subscribe(
      (res: any) => {
        console.log('Got posts ' );
        console.log(res);
        this.postArr = res as Post[];
        this.filterPosts();
        // this.sortByLastModifiedDesc();
      }, (err: any) => {
        console.log('error');
      }
    );
    
    // console.log(this.PostService.getPost());
  }

  logout():void{
    this.userservice.deleteToken();
    this.router.navigate(['login'])
  }

  filterPosts(){
      this.postArr = this.postArr.filter(
          book => book.fullName  != this.currentUserName);
      
      console.log("Filtered array");
      console.log(this.postArr);
  }
  
 sortByLastModifiedDesc() {
    this.postArr =  this.postArr.sort((a: any, b: any) => {
      return <any>new Date(b.time) - <any>new Date(a.time);
    });
    this.postArr = this.postArr.slice(0,10);
  }
}
