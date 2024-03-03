import { Component, Inject, OnInit, Optional, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FullNamePipe } from '../../../../../shared/full-name.pipe';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, FullNamePipe, MatDialogActions, MatDialogClose, MatButton, ReactiveFormsModule],
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.scss'
})
export class InscripcionFormComponent{
  inscripcionForm: FormGroup;
  constructor (
    private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>   
  ){
    this.inscripcionForm = this.fb.group({
      userId: this.fb.control('', Validators.required),
      courseId: this.fb.control('', Validators.required),
    });
  }

  users = this.data[0]
  courses = this.data[1]

  close(){
      this.inscripcionForm.reset();
      this.dialogRef.close(false)
     } 

  submit(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.inscripcionForm.value)
      this.inscripcionForm.reset();
    }
  }
   
    
  
}