import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ft-movement',
  template: `
    <mat-accordion>
      <mat-expansion-panel
        hideToggle class="mb-4"
        (opened)="panelOpenState = true"
        (closed)="panelOpenState = false"
      >
        <mat-expansion-panel-header>
          <mat-panel-title>
            <em>[{{ movementTimeStamp | date:'dd/MM/yyyy' }}]</em>
            <p class="px-3 mb-0" [ftMovementInOut]="movementType">
              {{ movementAmount | currency:'EUR' }}
            </p>
          </mat-panel-title>
          <mat-panel-description>
            {{ panelOpenState ? movementTitle : movementTitle | truncate }}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <p>{{ movementDescription }}</p>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent {
  @Input() movementTimeStamp = 0;
  @Input() movementType: 'in' | 'out' = 'in';
  @Input() movementAmount = 0;
  @Input() movementTitle = '';
  @Input() movementDescription = '';

  public panelOpenState = false;
}
