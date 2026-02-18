import { Component, OnInit, inject } from '@angular/core'; // <--- Añadido inject
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router'; // <--- Añadido ActivatedRoute

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUsComponent implements OnInit {
  // inject() y ActivatedRoute ahora funcionarán correctamente
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Escucha cambios en el fragmento de la URL (#manifiesto)
    this.route.fragment.subscribe(frag => {
      if (frag) {
        setTimeout(() => {
          const element = document.getElementById(frag);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }
}