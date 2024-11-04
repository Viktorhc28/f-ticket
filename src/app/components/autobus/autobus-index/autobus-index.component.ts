import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { AutobusService } from '../autobus.service';
import { AutobusViewComponent } from '../autobus-view/autobus-view.component';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { ModalDeleteComponent } from '../../../utils/modal-delete/modal-delete.component';
import { AutobusUpdateComponent } from '../autobus-update/autobus-update.component';
import { AutobusCreateComponent } from '../autobus-create/autobus-create.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-autobus-index',
  standalone: true,
  imports: [
    PanelModule,
    CardModule,
    DialogModule,
    ButtonModule,
    TableModule,
    CommonModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    TooltipModule,
    ToolbarModule,
    BadgeModule,
    ToastModule,
    ConfirmPopupModule
  ],
  templateUrl: './autobus-index.component.html',
  styleUrl: './autobus-index.component.css',
  providers: [AutobusService, ConfirmationService, MessageService],
})
export class AutobusIndexComponent implements OnInit {
  visible: boolean = false;
  loading: boolean = true;
  searchValue: string | undefined;
  products!: any[];

  constructor(
    private service: AutobusService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.index();
  }

  index(): void {
    this.loading = true;
    this.service.index().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  view(element: any): void {
    const modalRef = this.modalService.open(AutobusViewComponent, { windowClass: 'clear-modal', size: 'lg', scrollable: true });
    modalRef.componentInstance.element = element;
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  edit(element: any): void {
    const modalRef = this.modalService.open(AutobusUpdateComponent, { windowClass: 'clear-modal', size: 'lg', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.element = element;
    modalRef.componentInstance.created.subscribe(() => {
      this.index();
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  add(): void {
    const modalRef = this.modalService.open(AutobusCreateComponent, { windowClass: 'clear-modal', size: 'md', scrollable: true, backdrop: 'static' });
    modalRef.componentInstance.created.subscribe(() => {
      this.index();
    });
    modalRef.result.then((result: any) => {}, (reason: any) => {});
  }

  delete(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres eliminar este registro?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Registro eliminado', life: 3000 });
        this.service.delete(id).subscribe({
          next: (res) => {
            this.loading = true;
            setTimeout(() => {
              this.index();
            }, 1000);
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: err, life: 3000 });
            console.error(err);
          },
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Has rechazado', life: 3000 });
      },
    });
  }

  cambiarEstado(id: any) {
    this.service.estado(id).subscribe((res: any) => {});
  }
}
