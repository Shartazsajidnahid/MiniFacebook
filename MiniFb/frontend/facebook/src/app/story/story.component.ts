

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { story } from '../story';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
  providers: [PostService]
})
export class StoryComponent implements OnInit {
  // userDetails;
  currentUserName: String = "";


  Posts: any = [];
  userName: string = "";

  allStatus: any;
  allStory: any;
  updatedDate: any;


  question = "?";

  fileName = '';

  uploadedImage: any;


  file: File | null = null;

  newStory: story = {
    name: '',
    story: '',
    time: new Date()
  }
  fetchedStories: any;
  minioHost: string = "127.0.0.1";
  port: string = "9000";
  bucket: string = "story";

  userdetails: any;

  constructor(private postService: PostService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.currentUserName = this.userService.getLoggedUser().fullName;
    this.setCurrentUserName();
    this.getPosts();
  }
  setCurrentUserName(){
    // this.currentUserName = this.userservice.getLoggedUser().fullName;
    this.userService.getUserProfile().subscribe(
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




  getPosts() {
    this.postService.getStories().subscribe(
      (res: any) => {
        console.log('Got stories ');
        console.log(res.body);
        this.allStory = res;
        this.fetchedStories = this.allStory;
        this.sortByLastModifiedDesc();

        for (let i = 0; i < this.fetchedStories.length; i++) {
          this.fetchedStories[i].storyUUID = "http://" + this.minioHost + ":" + this.port + "/" + this.bucket + "/" + this.fetchedStories[i].storyUUID;
          // console.log(this.fetchedStories[i].time);
        }

      }, (err: any) => {
        console.log('error');
      }
    );
  }


  onFileSelected(event: any) {

    this.file = event.target.files[0];
    console.log("hey on file");

    let reader = new FileReader();

    if (this.file) {

      const formData = new FormData();
      formData.append('files', this.file);
      formData.append('name', String(this.currentUserName));
      console.log("formdata");
      console.log(formData);

      this.postService.postStory(formData).subscribe((res) => {
        if (res) {
          console.log('Story Done');
          alert("Story added successfully");
        }
        else {
          console.log("story not done")
        }
        // this.fetchStory();
      })
    }
  }



  //   filterStories(){
  //     this.fetchedStories = this.fetchedStories.filter(
  //         book => book.userid  != this.currentUserId);

  //     console.log("Filtered story array");
  //     console.log(this.fetchedStories);
  // }

  sortByLastModifiedDesc() {
    this.fetchedStories = this.fetchedStories.sort((a: any, b: any) => {
      return <any>new Date(b.time) - <any>new Date(a.time);
    });
    // this.fetchedStories = this.fetchedStories.slice(0,10);
  }

  // filterPosts() {
  //   for (let i = 0; i < this.fetchedStories.length; i++) {
  //     if (this.fetchedStories[i].name == this.currentUserId) {
  //       co
  //       this.fetchedStories.splice(i, 1);
  //     }
  //     // console.log(this.fetchedStories[i].time);
  //   }
  // }


}