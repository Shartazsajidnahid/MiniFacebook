import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private PostService: PostService, private router: Router) { }

  newpost = new Post();

  ngOnInit(): void {
  }

  // submitpost(){
  //   this.PostService.createPost(this.newpost);
  //   this.newpost = new Post();
  //   // this.router.navigate(['books']);
  // }

  

}
