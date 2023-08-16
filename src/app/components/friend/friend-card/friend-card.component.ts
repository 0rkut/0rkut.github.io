import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendCardComponent {

}
