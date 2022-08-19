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
  
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    this.newpost.fullName = this.userservice.getLoggedUser().fullName;
    this.newpost.email = this.userservice.getLoggedUser().email;
    console.log("fullname service " + this.newpost.email);
  }
  submitpost() {
    this.newpost.dom = new Date();
  
    this.userservice.postStatus(this.newpost).subscribe(
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
