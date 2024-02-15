import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipe } from '../../../../shared/full-name.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { Titulos20Directive } from '../../../../shared/titulos-20.directive';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatIconModule, FullNamePipe, MatDialogModule,UserFormComponent, Titulos20Directive, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'options'];
  dataSource: User[] = [];

  constructor(public dialog: MatDialog, private loadingService: LoadingService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.usersService.getUsers()
    ]).subscribe({
      next: (value) => {
        this.dataSource = value[0];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }})
  }

  add(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadingService.setIsLoading(true);
        this.usersService.addUser(result).subscribe({
          next: (users) => {
            this.dataSource = [...users]
          },
          complete: () => {
            this.loadingService.setIsLoading(false);
          }
        })
      }
    })
  }


  edit(id: any){   
    this.loadingService.setIsLoading(true)
    this.usersService.getUserById(id).subscribe({
      next: (result)=>{
        this.dialogEdit(result[0])
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    })  
  }

  dialogEdit(data: any){
    const dialogRef = this.dialog.open(UserFormComponent, {    
      data: data,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadingService.setIsLoading(true);
        this.usersService.editUser(result).subscribe({
          next: (users) => {
            this.dataSource = [...users]
          },
          complete: () => {
            this.loadingService.setIsLoading(false);
          }
        })
      }
    })

  }

  delete(id: number){
    this.loadingService.setIsLoading(true);
    this.usersService.deleteUser(id).subscribe({
      next: (users) => {
        this.dataSource = [...users]
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    })
  }
}
