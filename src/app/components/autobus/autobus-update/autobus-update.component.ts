import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutobusService } from '../autobus.service'; // Asegúrate de tener el servicio para manejar autobuses
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autobus-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './autobus-update.component.html',
  styleUrls: ['./autobus-update.component.css'] // Corrige a styleUrls
})
export class AutobusUpdateComponent {
  @Input() element: any; // Para recibir el autobús a editar
  form: FormGroup = new FormGroup({});
  @Output() created = new EventEmitter<void>(); // Emisor para indicar que se ha actualizado un registro

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
  }

  guardar() {
    if (this.form.valid) {
      this.service.update(this.form.value).subscribe({
        next: (res) => {
          this.activeModal.close(res.model); // Cierra el modal y devuelve el modelo actualizado
          this.created.emit(); // Emite el evento una vez actualizado el registro
        }, 
        error: (err) => {
          console.error(err); // Manejo de errores
        }
      });
    } else {
      this.form.markAllAsTouched(); // Marca todos los controles como tocados para mostrar los errores
    }
  }
}
