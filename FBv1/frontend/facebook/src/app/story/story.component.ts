

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
  currentUserId : String = "";


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
  minioHost: string="127.0.0.1";
  port: string="9000";
  bucket: string="story";


  constructor(private postService: PostService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUserId = this.userService.getToken();
    
    this.postService.getStories();
  }


//   fetchStory() {
//  this.postService.getStories().subscribe((data) =>{
//       this.allStory = data.body;
//       this.fetchedStories = this.allStory;
//       for(let i=0;i<this.fetchedStories.length;i++){
//         this.fetchedStories[i].storyUUID = "http://"+this.minioHost+":"+this.port+"/"+this.bucket+"/"+this.fetchedStories[i].storyUUID;
//         console.log(this.fetchedStories[i].storyUUID);
//       }
//     });
  
//   }


  onFileSelected(event: any) {

    this.file = event.target.files[0];
    console.log("hey on file");

    let reader = new FileReader();

    if (this.file) {

      const formData = new FormData();
      formData.append('files', this.file);
      formData.append('name', String(this.currentUserId));
      console.log("formdata");
      console.log(formData);

      this.postService.postStory(formData).subscribe((res) => {
        if (res) {
          console.log('Story Done');
        }
        else{ 
          console.log("story not done")
        }
          // this.fetchStory();
      })
    }
  }

  poststory(){
    const formData = new FormData();
    // formData.append('files', , this.file.name);
    // formData.append('name', this.userName);

    console.log(formData);
    this.postService.postStory(formData).subscribe((res) => {
      if (res) {
        console.log('Story Done');
      }
        // this.fetchStory();
    })
  }

  fetchStory() {
    console.log("from story comp");
    this.postService.getStories().subscribe((data) =>{
        
        console.log(data);
        //  this.allStory = data.body;
        //  this.fetchedStories = this.allStory;
        //  for(let i=0;i<this.fetchedStories.length;i++){
        //    this.fetchedStories[i].storyUUID = "http://"+this.minioHost+":"+this.port+"/"+this.bucket+"/"+this.fetchedStories[i].storyUUID;
        //    console.log(this.fetchedStories[i].storyUUID);
        //  }
       });
     
     }


  pos = new Post();


  check(){

    this.pos.content = "yo";
    this.pos.userid = "nahid";

    this.postService.checkpostStory(this.pos).subscribe((res) => {

    // this.postService.checkpostStory(this.pos);
  });

}


  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


}