import { Component, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FullNamePipe } from '../../../../shared/full-name.pipe';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Titulos20Directive } from '../../../../shared/titulos-20.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from '../../../../core/services/loading.service';
import { InscripcionesService } from './inscripciones.service';
import { Inscripciones } from '../courses/models';
import { InscripcionFormComponent } from './inscripcion-form/inscripcion-form.component';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FullNamePipe, 
    MatDialogModule,
    Titulos20Directive, 
    HttpClientModule
  ],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'fullName', 'curso', 'horarios', 'options'];
  dataSource: Inscripciones[] = [];

  constructor(public dialog: MatDialog, private loadingService: LoadingService, private inscripcionesService: InscripcionesService, private userService: UsersService, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.getPageData();
  }
  getPageData(){
    this.loadingService.setIsLoading(true);
    this.inscripcionesService.getInscripciones()
    .subscribe({
      next: (value) => {
        this.dataSource = value
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    })
  }

  


  add(){
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.userService.getUsers(),
      this.coursesService.getCourses()
    ]).subscribe({
      next: (value) => {
        this.getDataInscripciones(value)      
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }})
  }

  getDataInscripciones(data: any){
    const dialogRef = this.dialog.open(InscripcionFormComponent, {
      disableClose: true,
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadingService.setIsLoading(true);
        this.inscripcionesService.addInscripcion(result).subscribe({
          next: (inscripciones) => {
            this.dataSource = [...inscripciones]
          },
          complete: () => {
            this.loadingService.setIsLoading(false);
          }
        })
      }
    })
  }

}


