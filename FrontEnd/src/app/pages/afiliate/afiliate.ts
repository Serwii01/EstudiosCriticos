import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AssemblyService } from '../../services/assembly.service';
import { Assembly } from '../../models/assembly.model';

@Component({
  selector: 'app-afiliate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './afiliate.html',
  styleUrl: './afiliate.scss'
})
export class AfiliateComponent implements OnInit {
  form!: FormGroup;
  assemblies: Assembly[] = [];
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private assemblyService: AssemblyService) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      centro: ['', Validators.required],
      asamblea: ['', Validators.required],
      motivacion: [''],
      acepta: [false, Validators.requiredTrue]
    });

    this.assemblyService.getAll().subscribe({
      next: (data) => { this.assemblies = data; }
    });
  }

  getAssemblyEmail(): string {
    const id = parseInt(this.form.value.asamblea);
    const asm = this.assemblies.find(a => a.id === id);
    return asm ? asm.email : 'contacto@estudioscriticos.es';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = this.form.value;
    const destEmail = this.getAssemblyEmail();
    const subject = encodeURIComponent(`Solicitud de afiliación - ${val.nombre} ${val.apellidos}`);
    const body = encodeURIComponent(
      `Nombre: ${val.nombre} ${val.apellidos}\n` +
      `Email: ${val.email}\n` +
      `Teléfono: ${val.telefono || 'No indicado'}\n` +
      `Centro de estudios: ${val.centro}\n` +
      `Motivación: ${val.motivacion || 'No indicada'}\n`
    );
    window.location.href = `mailto:${destEmail}?subject=${subject}&body=${body}`;
    this.submitted = true;
  }
}
