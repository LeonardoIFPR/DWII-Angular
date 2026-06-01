import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [MatListModule, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('Meu Portfólio');
}
