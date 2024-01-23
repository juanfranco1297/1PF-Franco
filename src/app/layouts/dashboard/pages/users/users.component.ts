import { Component } from '@angular/core';
import { User } from './models';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { FullNamePipe } from '../../../../shared/full-name.pipe';
import {
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatDialog
} from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { Titulos20Directive } from '../../../../shared/titulos-20.directive';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatIconModule, FullNamePipe, MatDialogModule,UserFormComponent, Titulos20Directive],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'options'];
  dataSource: User[] = [
    {
      id: 1,
      firstName: 'Jon',
      lastName: 'Snow',
      email: 'jsnow@mail.com',
      password: '123456',
      role: 'ESTUDIANTE',
    },
    {
      id: 2,
      firstName: 'Theon',
      lastName: 'Geyjoy',
      email: 'tgreyjoy@mail.com',
      password: '123456',
      role: 'ESTUDIANTE',
    },
    {
      id: 3,
      firstName: 'Stark',
      lastName: 'Robb',
      email: 'rstark@mail.com',
      password: '123456',
      role: 'ESTUDIANTE',
    },
    {
      id: 4,
      firstName: 'Stark',
      lastName: 'Sansa',
      email: 'sstark@mail.com',
      password: '123456',
      role: 'ESTUDIANTE',
    },
  ];

  constructor(public dialog: MatDialog) {}

  add(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '75%',
      height: '50%',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSource = [...this.dataSource, { ...result, id: new Date().getTime() }];
      }
    })
  }

  edit(id: any){
    const user = this.dataSource.find( user => user.id == id)
    console.log(user)

    const dialogRef = this.dialog.open(UserFormComponent, {    
      data: user,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const index = this.dataSource.findIndex((user) => user.id == result.id);
        this.dataSource.splice(index, 1)
        this.dataSource = [...this.dataSource, result]
      }
    })
  }

  onUserSubmitted(ev: User): void {
    // this.dataSource.push(ev);
    console.log(ev)
    //this.dataSource = [...this.dataSource, { ...ev, id: new Date().getTime() }];
  }

  delete(id: any){
    const index = this.dataSource.findIndex((user) => user.id == id);
    this.dataSource.splice(index, 1)
    this.dataSource = [...this.dataSource]
  }
}
