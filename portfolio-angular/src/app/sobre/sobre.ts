import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sobre',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {}
