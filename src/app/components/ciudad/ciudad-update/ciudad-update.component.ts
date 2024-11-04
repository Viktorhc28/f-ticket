import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CiudadService } from '../ciudad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ciudad-update.component.html',
  styleUrl: './ciudad-update.component.css'
})
export class CiudadUpdateComponent {
  @Input() element: any
  form: FormGroup = new FormGroup({});
  @Output() created = new EventEmitter<void>()
  constructor(
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public service: CiudadService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [],
      nombre: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      estado: [1, [Validators.required]],
    });
    this.form.patchValue(this.element)

  }

  
  guardar() {
    if (this.form.valid) {
      this.service.update(this.form.value).subscribe({
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
