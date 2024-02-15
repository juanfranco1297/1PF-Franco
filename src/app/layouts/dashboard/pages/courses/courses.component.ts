import { Component, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipe } from '../../../../shared/full-name.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { Titulos20Directive } from '../../../../shared/titulos-20.directive';
import { HttpClientModule } from '@angular/common/http';
import { Courses } from './models';
import { LoadingService } from '../../../../core/services/loading.service';
import { CoursesService } from './courses.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatIconModule, FullNamePipe, MatDialogModule, Titulos20Directive, HttpClientModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'profesor', 'nombre', 'horarios', 'options'];
  dataSource: Courses[] = [];

  constructor (private loadingService: LoadingService, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.getPageData()
  }

  getPageData() {
    this.loadingService.setIsLoading(true)
    forkJoin([
      this.coursesService.getCourses(),
      this.coursesService.getProfesores()
    ]).subscribe({
      next: (value) =>{
        const courses = value[0]
        const profesores = value[1]
        for (let i = 0; i < courses.length; i++) {
          var profesor = profesores.filter((profesor)=>{
            return profesor.id == courses[i].id_profesor
          })          
          courses[i].profesor = profesor[0]
        }
        this.dataSource = courses
      },
      complete: () => {
        this.loadingService.setIsLoading(false)
      }
    })
  }

}
