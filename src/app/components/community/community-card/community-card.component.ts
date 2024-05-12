import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Community } from '@models/community.models';
import { UserService } from '@services/user/user.service';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-community-card',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  @Input({ required: true }) community!: Community;

  private userService = inject(UserService);

  userId$ = this.userService.userId$;
}
