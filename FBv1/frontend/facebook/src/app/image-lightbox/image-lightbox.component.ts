import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { images } from '../image.data';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})

export class ImageLightboxComponent implements OnInit {

  constructor(private imageservice: ImageService, private router: Router) { }

  imag : images[] = [];
  
  ngOnInit(): void {
    this.imag = this.imageservice.fetchImages();
    console.log("image lislt");
    console.log(this.imag);
  }



}
