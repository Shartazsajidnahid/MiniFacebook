import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private PostService: PostService, private router: Router, private userservice: UserService) { }

  newpost = new Post();
  userdetails: any;
  ngOnInit(): void {
    this.setCurrentUserName();
  }

  setCurrentUserName(){
    // this.currentUserName = this.userservice.getLoggedUser().fullName;
    this.userservice.getUserProfile().subscribe(
      (res:any) => {
        console.log("res");
        console.log(res);
        this.userdetails = res['user'];
        this.newpost.fullName = this.userdetails.fullName;
        this.newpost.email = this.userdetails.email;
        // console.log("user details: ");
        // // console.log(this.currentUserName);
        // console.log(this.userdetails);

      },
      (err: any) => {
        console.log("error");
      }
    )
    
    // console.log(this.currentUserName);

    
  }

  submitpost() {
    this.newpost.dom = new Date();
  
    this.PostService.createPost(this.newpost).subscribe(
        (res: any) => {
          console.log('posted successfully');
          console.log(res);
          this.newpost.status="";
          alert("Post created successfully");
        }, (err: any) => {
          console.log('error');
        }
      );
 }

 

}
