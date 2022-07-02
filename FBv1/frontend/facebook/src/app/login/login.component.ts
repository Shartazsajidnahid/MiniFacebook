import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      password: ['', Validators.required],
      userid: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }


  postdata1(angForm1: { value: { userid:any; password: any; }; }) {
    this.newuser.userid = angForm1.value.userid;
    this.newuser.password = angForm1.value.password;
    console.log("from login comp");
    this.userservice.userlogin(this.newuser).subscribe(
      (res: any) => {
        console.log('logged in successfully: ' );
        console.log(res);
        // this.userservice.currentuser = res;
        this.userservice.setToken(this.newuser.userid);
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
