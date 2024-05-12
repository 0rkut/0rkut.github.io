import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FriendCardComponent } from '../friend-card/friend-card.component';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [CommonModule, FriendCardComponent],
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendListComponent {}
