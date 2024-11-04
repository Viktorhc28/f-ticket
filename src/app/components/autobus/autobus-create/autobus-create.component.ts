import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutobusService } from '../autobus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autobus-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './autobus-create.component.html',
  styleUrl: './autobus-create.component.css'
})
export class AutobusCreateComponent {

  constructor(
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public service: AutobusService,
    private modalService: NgbModal,
  ) { }

  @Output() created = new EventEmitter<void>(); // Emisor para indicar que se ha creado un registro
  form: FormGroup = new FormGroup({});
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      placa: ['', [Validators.required]],  // Nombre del autobús
      modelo: ['', [Validators.required]],  // Modelo del autobús
      /* capacidad: [0, [Validators.required, Validators.min(1)]],  // Capacidad de asientos */
      ano_fabricacion: ['', [Validators.required]], 
    });
  }

  guardar() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe({
        next: (res) => {
          this.activeModal.close(res.model);
          this.created.emit(); // Emite el evento una vez creado el registro
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
