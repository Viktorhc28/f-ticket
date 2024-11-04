import { Component, HostListener } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    MenuModule,
    PanelMenuModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class MenuComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
    },
    {
      label: 'Orders',
      icon: 'pi pi-fw pi-shopping-cart',
    },
    {
      label: 'Revenue',
      icon: 'pi pi-fw pi-chart-line',
    },
    {
      label: 'Customers',
      icon: 'pi pi-fw pi-users',
    },
    {
      label: 'Comments',
      icon: 'pi pi-fw pi-comments',
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
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
