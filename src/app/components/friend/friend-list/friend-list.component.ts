import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from '../../list/list.component';
import { FriendCardComponent } from '../friend-card/friend-card.component';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [CommonModule, FriendCardComponent, ListComponent],
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendListComponent {

}
