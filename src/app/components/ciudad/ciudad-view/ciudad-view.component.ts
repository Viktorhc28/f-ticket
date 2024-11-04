import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CiudadService } from '../ciudad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad-view',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ciudad-view.component.html',
  styleUrl: './ciudad-view.component.css'
})
export class CiudadViewComponent {
  @Input() element: any
  form: FormGroup = new FormGroup({});
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
    this.form.disable()
  }
}
