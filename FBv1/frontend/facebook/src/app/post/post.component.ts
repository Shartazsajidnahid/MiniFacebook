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
    this.newpost.userid = String(this.userservice.getToken());
  }

  submitpost() {
    
    this.PostService.createPost(this.newpost).subscribe(
        (res: any) => {
          console.log('posted successfully');
          console.log(res);
          this.newpost.content="";
        }, (err: any) => {
          console.log('error');
        }
      );
 }

}
