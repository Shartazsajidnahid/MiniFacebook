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

  ngOnInit(): void {
    this.setCurrentUserName();
    this.getPosts();
    // this.currentUserId = this.userservice.getToken();
  }

  setCurrentUserName(){
    this.currentUserName = this.userservice.getLoggedUser().fullName;
    
  }

  getPosts(){
    this.userservice.getUserPosts().subscribe(
      (res: any) => {
        console.log('Got posts ' );
        console.log(res);
        this.postArr = res as Post[];
        // this.filterPosts();
        // this.sortByLastModifiedDesc();
      }, (err: any) => {
        console.log('error');
      }
    );
    
    // console.log(this.PostService.getPost());
  }

  logout():void{
    this.userservice.deleteToken();
    this.router.navigate(['signup'])
  }

  filterPosts(){
      // this.postArr = this.postArr.filter(
      //     book => book.userid  != this.currentUserId);
      
      // console.log("Filtered array");
      // console.log(this.postArr);
  }
  
 sortByLastModifiedDesc() {
    this.postArr =  this.postArr.sort((a: any, b: any) => {
      return <any>new Date(b.time) - <any>new Date(a.time);
    });
    this.postArr = this.postArr.slice(0,10);
  }
}
