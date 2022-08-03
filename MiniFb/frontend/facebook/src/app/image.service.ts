

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { images } from "./image.data";

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  imag : images[] =
  [{
    id : 1,
    url: "../5521267.jpg"
  },
  {
    id: 2,
    url: "../5521267.jpg"  },
  {
    id: 3,
    url: "../5521267.jpg"  },
  {
    id: 4,
    url: "../5521267.jpg"  },
    {
      id: 5,
      url: "../5521267.jpg"  },
    {
      id: 6,
      url: "../5521267.jpg"  },
    {
      id: 7,
      url: "../5521267.jpg"  }
]
  constructor() {
   
  }
  fetchImages(): images[] {
    console.log("image lislt from service");
    console.log(this.imag);
    return this.imag;
  }

}
