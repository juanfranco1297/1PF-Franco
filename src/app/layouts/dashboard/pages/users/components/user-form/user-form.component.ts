import { Component, Inject, Optional} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { User } from '../../models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent{

  userForm: FormGroup;


  constructor(private fb: FormBuilder, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<UserFormComponent>) {
    this.userForm = this.fb.group({
      id: this.fb.control(''),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
      token: this.fb.control('') //supongo que en un proyecto real no recibiria el token del usuario, solo lo usaria para loguearse y comunicarse con el back
    });
    if(this.data){
      this.userForm.setValue(
        this.data
      )
    }
  }

   close(){
    this.userForm.reset();
    this.dialogRef.close(false)
   } 

  submit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value)
      this.userForm.reset();
    }
  }

}


