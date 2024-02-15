import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
