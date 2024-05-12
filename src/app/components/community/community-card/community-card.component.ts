import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Community } from '@models/community.models';
import { CommunityService } from '@services/community/community.service';
import { ConfirmService } from '@services/confirm/confirm.service';
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

  constructor(
    private confirmService: ConfirmService,
    private communityService: CommunityService,
  ) {}

  delete() {
    this.confirmService.confirm({
      message: `Quer mesmo apagar a comunidade ${this.community?.name}?`,
      description:
        'Esta ação não poderá ser desfeitas e todos os dados desta comunidade serão perdidos',
      actions: [
        {
          type: 'warning',
          callback: () => {
            this.communityService.delete(this.community?.id);
          },
        },
      ],
    });
  }
}
