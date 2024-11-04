import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule,NgbModalModule], 
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit {

  @Input() texto: string = "¡Atención! Está a punto de eliminar un elemento de la tabla.";
  @Input() textoAceptar: string = "Eliminar elemento";
  @Input() textoCancelar: string = "Cancelar";
  @Input() link: string = "";
  @Input() boton_estado: boolean = true;
  @Input() class_boton: string = "btn btn-danger";
  @Input() titulo: string = "";
  @Input() detalle: string = "";
  @Input() soloVolver: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() { }

  guardar() {
    this.activeModal.close(true);
  }

  cancelar() {
    this.activeModal.dismiss()
  }

}
