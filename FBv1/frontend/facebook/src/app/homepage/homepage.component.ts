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

  postArr: Post[] = [];

  ngOnInit(): void {
    this.getPosts();
  }

  // submitpost(){
  //   this.PostService.createPost(this.newpost);
  //   this.newpost = new Post();
  //   // this.router.navigate(['books']);
  // }

  getPosts(){
    this.PostService.getPost().subscribe(
      (res: any) => {
         console.log('Got posts ' );
        console.log(res);
        this.postArr = res as Post[];
      }, (err: any) => {
        console.log('error');
      }
    );
    // console.log(this.PostService.getPost());
    

    
  }

  

}
