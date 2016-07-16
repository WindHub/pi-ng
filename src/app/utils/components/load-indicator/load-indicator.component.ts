import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-load-indicator',
  templateUrl: './load-indicator.component.html'
})
export class LoadIndicatorComponent {
  @Input() loading: boolean;
}
