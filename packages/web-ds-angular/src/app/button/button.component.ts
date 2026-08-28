import { Component, EventEmitter, Input, Output } from '@angular/core';

// Angular port of @statrys/web-ds's Button (React). Only the Rec (labeled)
// shape is ported for this pilot — Square/Circle (icon-only) intentionally
// left out, since the point here is proving the token/CSS layer carries over
// unchanged, not re-doing every prop on day one.
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rec' | 'rounded';

@Component({
  selector: 'ds-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() shape: ButtonShape = 'rec';
  @Input() disabled = false;
  @Input() inverse = false;
  @Output() pressed = new EventEmitter<void>();

  get classes(): string {
    return [
      'base',
      this.variant,
      this.size,
      this.shape === 'rounded' ? 'rounded' : null,
      this.inverse ? 'inverse' : null,
    ]
      .filter((c): c is string => !!c)
      .join(' ');
  }

  onClick(): void {
    if (!this.disabled) {
      this.pressed.emit();
    }
  }
}
