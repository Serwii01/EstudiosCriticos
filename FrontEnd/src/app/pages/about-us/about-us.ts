import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // <--- Importación clave
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUsComponent {

}
