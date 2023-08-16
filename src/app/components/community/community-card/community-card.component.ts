import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-community-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityCardComponent {

}
