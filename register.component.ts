import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder, private toastr:ToastrService, 
  private service:AuthService, private router:Router ){

  }

  registrationForm=this.builder.group({
    id:this.builder.control('', Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('', Validators.required),
    email:this.builder.control('', Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('Male'),
    role:this.builder.control('')
  });

  proceedRegistration(){
    if(this.registrationForm.valid){
      this.service.addEmployee(this.registrationForm.value).subscribe(res=>{
        this.toastr.success('Registered Successfully!')
        debugger;
        this.router.navigate(['user']);
      });
    }
    else{
      this.toastr.warning('Please Enter Valid Data')
    }
  }

  resetForm() {
    this.registrationForm.reset({
      id: '',
      name: '',
      email: '',
      gender: 'Male', 
      role: ''        
    });

    console.log('Form reset to initial values');
  }
}
