import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  myForm: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(
        null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
      password: new FormControl(
        null,
        Validators.required
      )
    });
  }

  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password
    )
    this.authService.signin(user).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        this.router.navigateByUrl('/');
      },
      err => console.error(err)
    );
    this.myForm.reset();
  }

}
