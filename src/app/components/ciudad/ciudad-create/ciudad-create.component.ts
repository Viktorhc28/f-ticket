import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CiudadService } from '../ciudad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ciudad-create.component.html',
  styleUrl: './ciudad-create.component.css'
})
export class CiudadCreateComponent {

  constructor(
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public service: CiudadService,
    private modalService: NgbModal,
  ) { }
  @Output() created = new EventEmitter<void>(); // Emisor para indicar que se ha creado un registro
  form: FormGroup = new FormGroup({});
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      estado: [1, [Validators.required]],
    });

  }


  guardar() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe({
        next: (res) => {
          this.activeModal.close(res.model);
          this.created.emit(); // Emite el evento una vez creado el registro
        }, error: (err) => {
          console.error(err);

        }
      });
    } else {
      this.form.markAllAsTouched();

    }
  }

}
