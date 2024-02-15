import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './pages/users/users.component';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../auth/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule,MatIconModule, MatButtonModule, UsersComponent, MatIcon, MatListModule, MatDividerModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  constructor( private authService: AuthService) {}

  logout(){
    this.authService.logout();
  }
}
