import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatListModule, MatCardModule, MatSidenavModule, MatIconModule, MatMenuModule, MatGridListModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('Meu Portfólio');
}
