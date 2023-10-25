import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-login',
  templateUrl: './expense-login.component.html',
  styleUrls: ['./expense-login.component.css']
})
export class ExpenseLoginComponent {

  posts:any;
  myGroup: FormGroup;


  constructor(private service:PostService,private formBuilder: FormBuilder,private router: Router) {}

  onSubmit() {
    const username = 'test';
    const password = 'test';
    if(this.myGroup.value.username === username && this.myGroup.value.password === password){
      this.router.navigate(['./app-expense-home']);
    }else{
      this.router.navigate(['./app-expense-login']);
    }
 }

  ngOnInit() {
    this.myGroup = this.formBuilder.group({
      'username': this.formBuilder.control(''),
      'password': this.formBuilder.control('')
    });

      this.service.getPosts()

        .subscribe(response => {

          this.posts = response;
          console.log(this.posts);

        });

  }

}
