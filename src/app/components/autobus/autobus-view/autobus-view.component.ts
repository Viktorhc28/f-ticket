import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutobusService } from '../autobus.service';

@Component({
  selector: 'app-autobus-view',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './autobus-view.component.html',
  styleUrl: './autobus-view.component.css'
})
export class AutobusViewComponent {
  form: FormGroup = new FormGroup({});
  @Input() element: any;
  constructor(
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public service: AutobusService, // Usa el servicio correspondiente
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [], // Asegúrate de tener el ID para actualizar
      placa: ['', [Validators.required]], // Nombre del autobús
      modelo: ['', [Validators.required]], // Modelo del autobús
      ano_fabricacion: ['', [Validators.required]], // Año de fabricación
    });
    this.form.patchValue(this.element); // Rellena el formulario con los datos del autobús
    this.form.disable()
  }
}
