import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  newuser = new User();

  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) {
    this.angForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),

      // userid: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }


  postdata1(angForm1: { value: { email:any; password: any; }; }) {
    this.newuser.email = angForm1.value.email;
    this.newuser.password = angForm1.value.password;
    console.log("from login comp");
    this.userservice.loadPotentialUser(this.newuser);
    this.userservice.authUser(this.userservice.potentialUser).subscribe(
      (res: any) => {
        console.log('logged in successfully: ' );
        console.log(res);
        this.userservice.setToken(res);

        // this.userservice.currentuser = res;
        // this.userservice.setToken(this.newuser.userid);
        // localStorage.setItem('token', res);
        this.router.navigate(['homepage']);
        // alert(this.userservice.getToken());
      }, (err: any) => {
        alert('Wrong Credentials');
      }
    );
    
}
  toRegister(){
    this.router.navigate(['signup']);
  }

}
