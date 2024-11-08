import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./utils/menu/menu.component";
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    SidebarModule,
    ButtonModule,
    MenuModule,
    PanelMenuModule,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService,HttpClientModule],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'f-ticket';

  constructor(private router: Router) { }

  items: MenuItem[] = [
    {
      label: 'Ciudad',
      icon: 'fas fa-city',
      command: () => this.router.navigate(['/ciudad'])
    },
    {
      label: 'Autobus',
      icon: 'fas fa-bus',
      command: () => this.router.navigate(['/autobus'])
    },
    {
      label: 'Revenue',
      icon: 'pi pi-fw pi-chart-line',
      command: () => this.router.navigate(['/revenue'])
    },
    {
      label: 'Customers',
      icon: 'pi pi-fw pi-users',
      command: () => this.router.navigate(['/customers'])
    },
    {
      label: 'Comments',
      icon: 'pi pi-fw pi-comments',
      command: () => this.router.navigate(['/comments'])
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => this.router.navigate(['/settings'])
    },
  ];



  isMobile: boolean = false; // Para detectar si está en móvil
  isSidebarVisible: boolean = true; // La barra lateral comienza visible en pantallas completas

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize(); // Verifica el tamaño de la pantalla al cargar
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Ajusta el tamaño según tus necesidades
    // Si está en móvil y la barra lateral está visible, la oculta
    if (this.isMobile && this.isSidebarVisible) {
      this.isSidebarVisible = false; // Oculta la barra lateral en móviles
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible; // Alterna la visibilidad de la barra lateral
  }
}
