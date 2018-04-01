import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {
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
  myForm: FormGroup;
  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
  }

}
