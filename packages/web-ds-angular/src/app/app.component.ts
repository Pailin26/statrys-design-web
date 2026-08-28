import { Component } from '@angular/core';
import { ButtonComponent, ButtonVariant } from './button/button.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary'];
}
